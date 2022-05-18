import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useRef, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';
import Header from '../../ui/components/Header/Header';
import { useStyles } from './CreateProposal.styles';
import CountrySelect from '../../ui/components/general/CountrySelect/CountrySelect';
import Input from '../../ui/components/general/Input/Input';

const CreateProposal = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const stateRequired = useRef();
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const onCreateApplicant = useStoreActions((actions) => actions.main.onCreateApplicant);

  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => submitButtonHandler(data);

  const submitButtonHandler = (data) => {
    setLoading(true);
    console.log(data);
    //    data.dob = moment(data.dob).format('YYYY.MM.DD HH:ss:mm');
    //    onCreateApplicant({ history, data });
  };

  const classes = useStyles();

  return (
    <>
      <Header history={history} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        component="main"
        sx={{ backgroundColor: '#f7f7f7' }}
      >
        <Box className={classes.container}>
          <Box className={classes.wrapper}>
            <Box className={classes.form}>
              <Box className={classes.formHeader}>
                <Typography className={classes.formTitle} variant="h6">
                  Proposal
                </Typography>
              </Box>
              <Box className={classes.inputGroup}>
                <Input
                  id="filled-name"
                  label={'Name of recipient and/or entity'}
                  name="firs_name"
                  register={register}
                  errors={errors}
                />
              </Box>
              <Box className={classes.inputGroup}>
                <Input
                  id="filled-name"
                  label={'Service description'}
                  name="service_description"
                  register={register}
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
                  Payment details
                </Divider>
              </Box>
              <Box className={classes.inputGroup}>
                <Input
                  id="payment-type"
                  label={'Payment type'}
                  name="payment_type"
                  register={register}
                  errors={errors}
                />
              </Box>
              <Box className={classes.inputGroup}>
                <Input
                  id="account-id"
                  label={'Account ID'}
                  name="account_id"
                  register={register}
                  errors={errors}
                />
              </Box>
              <Box className={classes.inputGroup}>
                <Input
                  id="filled-name"
                  label={'Currency denomination'}
                  name="curr_denomination"
                  register={register}
                  errors={errors}
                />
              </Box>
              <Box className={classes.inputGroup}>
                <FormGroup row>
                  <FormControlLabel
                    control={<Checkbox {...register('vat')} />}
                    label="Include VAT"
                  />
                  <Tooltip title="VAT" placement="right-start">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </FormGroup>
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
          <Box className={classes.formFooter}>
            <LoadingButton
              loading={loading}
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              disableElevation
            >
              Submit
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateProposal;
