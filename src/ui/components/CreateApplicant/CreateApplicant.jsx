import { Box, Button, Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import history from 'history/browser';
import moment from 'moment';

const CreateApplicant = () => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last name is required'),
    dob: Yup.string().required('Birthday is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const onCreateApplicant = useStoreActions((actions) => actions.main.onCreateApplicant);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = (data) => submitButtonHandler(data);

  const submitButtonHandler = (data) => {
    setLoading(true);
    data.dob = moment(data.dob).format('YYYY.MM.DD HH:ss:mm');
    onCreateApplicant({ history, data });
  };

  const useStyles = makeStyles(() => ({
    container: {
      width: '100%',
      maxWidth: 560,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto',
    },
    wrapper: {
      display: 'flex',
      paddingLeft: 40,
      paddingRight: 40,
    },
    form: {
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
    },
    input: {
      '& .MuiFilledInput-root': {
        borderRadius: 4,
        '& input': {
          paddingTop: 16,
          paddingRight: 36,
          paddingBottom: 14,
          paddingLeft: 14,
        },
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
              Before ypu start, please prepare you identity document and make sure it is valid.
            </Typography>
          </Box>
          <Box className={classes.inputGroup}>
            <TextField
              required
              id="filled-name"
              label="Name"
              variant="filled"
              fullWidth
              className={classes.input}
              InputProps={{ disableUnderline: true }}
              {...register('first_name')}
            />
            <ErrorMessage
              errors={errors}
              name="first_name"
              as={<span className="error-message" style={{ color: 'red' }} />}
            />
          </Box>
          <Box className={classes.inputGroup}>
            <TextField
              required
              id="filled-lastname"
              fullWidth
              label="Last name"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className={classes.input}
              {...register('last_name')}
            />
            <ErrorMessage
              errors={errors}
              name="last_name"
              as={<span className="error-message" style={{ color: 'red' }} />}
            />
          </Box>
          <Box className={classes.inputGroup}>
            <TextField
              id="birthday"
              label="Birthday"
              type="date"
              variant="filled"
              className={classes.input}
              InputProps={{ disableUnderline: true }}
              fullWidth
              {...register('dob')}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <ErrorMessage
              errors={errors}
              name="dob"
              as={<span className="error-message" style={{ color: 'red' }} />}
            />
          </Box>
          <Box className={classes.inputGroup}>
            <TextField
              required
              id="filled-email"
              fullWidth
              type="email"
              label="Email"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className={classes.input}
              {...register('email')}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              as={<span className="error-message" style={{ color: 'red' }} />}
            />
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
