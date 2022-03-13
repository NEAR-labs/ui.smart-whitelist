import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import { api } from '../../../config/api';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Input from '../general/Input/Input';

const CreateApplicant = () => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last name is required'),
    dob: Yup.string().required('Birthday is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
  });

  useEffect(async () => {
    const response = await api.getCountries();
    if (response.length > 0) {
      const supportedIdentityReport = response.filter(
        (item) => item.supported_identity_report === true,
      );
      setCountries(supportedIdentityReport);
    }
  }, []);

  const formOptions = { resolver: yupResolver(validationSchema) };

  const onCreateApplicant = useStoreActions((actions) => actions.main.onCreateApplicant);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => submitButtonHandler(data);

  const submitButtonHandler = (data) => {
    setLoading(true);
    console.log(data);
    //  data.dob = moment(data.dob).format('YYYY.MM.DD HH:ss:mm');
    //  onCreateApplicant({ data });
  };

  const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F2F2F2',
    },
    wrapper: {
      display: 'flex',
      paddingLeft: 40,
      paddingRight: 40,
      backgroundColor: '#fff',
    },
    form: {
      maxWidth: 500,
      display: 'flex',
      flexDirection: 'column',
    },
    formHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 16,
      marginTop: 24,
      marginBottom: 24,
    },
    formTitle: {
      fontSize: '20px !important',
      fontWeight: '700 !important',
    },
    formDescription: {
      textAlign: 'left',
      fontSize: '16px !important',
    },
    inputGroup: {
      marginBottom: '24px !important',
      textAlign: 'left',
      '& .MuiDivider-root::before': {
        width: '0 !important',
      },
    },
    select: {
      '& .MuiFilledInput-root': {
        borderRadius: 4,
      },
    },
    formFooter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      paddingRight: '49px !important',
      paddingLeft: '49px !important',
    },
  }));

  const handleChangeCity = (event) => {
    setCountry(event.target.value);
  };

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        <Box className={classes.form}>
          <Box className={classes.formHeader}>
            <Typography className={classes.formTitle} variant="h6">
              Verify your account
            </Typography>
            <Typography variant="body2" className={classes.formDescription}>
              Before you start, please prepare you identity document and make sure it is valid.
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
            <Divider textAlign="left">Addres details</Divider>
          </Box>
          <Box className={classes.inputGroup}>
            <FormControl fullWidth variant="filled" className={classes.select}>
              <InputLabel id="select-country-label" style={{ fontSize: 14 }}>
                Country
              </InputLabel>
              <Select
                labelId="select-country-label"
                id="select-country"
                value={country}
                label="Country"
                disableUnderline
                {...register('address.country')}
                onChange={handleChangeCity}
              >
                {countries.map((country) => (
                  <MenuItem key={country.name} value={country.alpha3}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className={classes.inputGroup}>
            <Input label={'City'} register={register} name={'address.town'} />
          </Box>
          <Box className={classes.inputGroup} display="flex" flexDirection="row">
            <Box sx={{ mr: 0.5, width: '40%' }}>
              <Input label={'Street'} register={register} name={'address.street'} />
            </Box>
            <Box sx={{ ml: 0.5, mr: 0.5, width: '25%' }}>
              <Input
                label={'Building number'}
                register={register}
                name={'address.building_number'}
              />
            </Box>
            <Box sx={{ ml: 0.5, width: '35%' }}>
              <Input label={'Zip/Postal code'} register={register} name={'address.postcode'} />
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
              Verify
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateApplicant;
