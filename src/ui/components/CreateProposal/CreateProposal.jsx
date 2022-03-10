import { Box, Typography, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import moment from 'moment';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';

const CreateProposal = ({ history }) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
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
    console.log(data);
    //    data.dob = moment(data.dob).format('YYYY.MM.DD HH:ss:mm');
    //    onCreateApplicant({ history, data });
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
      width: '100%',
      paddingLeft: 40,
      paddingRight: 40,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
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
    formGroup: {
      flexDirection: 'row !important',
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
              Proposal
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
            <FormGroup row>
              <FormControlLabel control={<Checkbox {...register('vat')} />} label="Include VAT" />
              <Tooltip title="VAT" placement="right-start">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </FormGroup>
          </Box>
          <Box className={classes.inputGroup}>
            <Divider textAlign="left">Addres details</Divider>
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
    </Box>
  );
};

export default CreateProposal;
