import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState, useRef } from 'react';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import Input from '../../general/Input/Input';
import { useStyles } from './CreateApplicant.styles';
import CountrySelect from '../../general/CountrySelect/CountrySelect';

const CreateApplicant = () => {
  const [loading, setLoading] = useState(false);
  const stateRequired = useRef();

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last name is required'),
    dob: Yup.string().required('Birthday is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    address: Yup.object({
      country: Yup.string().required('Country is required'),
      state: Yup.lazy(() => {
        if (stateRequired.current) {
          return Yup.string().required('State is required');
        }
        return Yup.string().notRequired();
      }),
      town: Yup.string().required('City is required'),
      street: Yup.string().required('Street is required'),
    }),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const onCreateApplicant = useStoreActions((actions) => actions.main.onCreateApplicant);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => submitButtonHandler(data);

  const submitButtonHandler = (data) => {
    setLoading(true);
    data.dob = moment(data.dob).format('YYYY.MM.DD HH:ss:mm');
    onCreateApplicant({ data });
  };

  const classes = useStyles();

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.wrapper}>
          <Box className={classes.form}>
            <Box className={classes.formHeader}>
              <Typography className={classes.formTitle} variant="h6">
                Account details
              </Typography>
            </Box>
            <Box className={classes.inputGroup}>
              <Input
                label={'Name'}
                register={register}
                name={'first_name'}
                type={'text'}
                errors={errors}
              />
            </Box>
            <Box className={classes.inputGroup}>
              <Input label={'Last name'} register={register} name={'last_name'} errors={errors} />
            </Box>
            <Box className={classes.inputGroup}>
              <Input
                label={'Birthday'}
                register={register}
                name={'dob'}
                type={'date'}
                errors={errors}
              />
            </Box>
            <Box className={classes.inputGroup}>
              <Input
                label={'Email'}
                register={register}
                name={'email'}
                type={'email'}
                errors={errors}
              />
            </Box>
            <Box className={classes.inputGroup}>
              <Divider textAlign="left" sx={{ fontWeight: 600 }}>
                Address details
              </Divider>
            </Box>
            <Box className={classes.inputGroup}>
              <CountrySelect control={control} errors={errors} />
            </Box>
            {watch('address.country') === 'USA' && (
              <Box className={classes.inputGroup}>
                <Input
                  label={'State'}
                  register={register}
                  name={'address.state'}
                  errors={errors}
                  inputRef={stateRequired}
                />
              </Box>
            )}
            <Box className={classes.inputGroup}>
              <Input label={'City'} register={register} name={'address.town'} errors={errors} />
            </Box>
            <Box className={classes.inputGroup} display="flex" flexDirection="row">
              <Box sx={{ mr: 0.5, width: '40%' }}>
                <Input
                  label={'Street'}
                  register={register}
                  name={'address.street'}
                  errors={errors}
                />
              </Box>
              <Box sx={{ ml: 0.5, mr: 0.5, width: '25%' }}>
                <Input
                  label={'Building number'}
                  register={register}
                  name={'address.building_number'}
                  errors={errors}
                />
              </Box>
              <Box sx={{ ml: 0.5, width: '35%' }}>
                <Input
                  label={'Zip/Postal code'}
                  register={register}
                  name={'address.postcode'}
                  errors={errors}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={classes.formFooter}>
        <LoadingButton
          loading={loading}
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disableElevation
        >
          Next
        </LoadingButton>
      </Box>
    </>
  );
};

export default CreateApplicant;
