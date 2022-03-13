import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Box, Button, Typography } from '@mui/material';
import Clock from '../../general/img/clock.png';
import { makeStyles } from '@mui/styles';
import Man from '../../general/img/man.png';
import Hand from '../../general/img/hand.png';
import { useNavigate } from 'react-router';
import { routes } from '../../../../config/routes';

const { createProposal } = routes;

const CheckVerification = ({ history }) => {
  const actions = useStoreActions((actions) => actions.main);
  const onRegisterSession = actions.onRegisterSession;
  const state = useStoreState((state) => state);
  const navigate = useNavigate();
  const sessionStatus = state.main.session.status;

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: 'calc(100% - 66px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F2F2F2',
    },
    container: {
      maxWidth: 580,
      width: '100%',
      maxHeight: 208,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      background: '#fff',
      marginLeft: 16,
      marginRight: 16,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    img: {
      width: 72,
      height: 72,
    },
    formHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
  const [counter, setCounter] = useState(0);

  const startCounter = () => {
    setCounter(counter + 1);
  };
  const stopCounter = () => {
    setCounter(0);
  };

  useEffect(() => {
    let timer;
    if (counter)
      timer = setTimeout(() => {
        setCounter(counter + 1);
        onRegisterSession(history);
      }, 60000);

    return () => clearTimeout(timer);
  }, [counter]);

  if (!counter && sessionStatus === 'verification_in_progress') {
    startCounter();
  }
  if (counter && sessionStatus === 'account_is_whitelisted') {
    stopCounter();
  }

  const handleSubmit = () => {
    navigate(createProposal);
  };

  return (
    <>
      {sessionStatus === 'verification_in_progress' && (
        <Box className={classes.root}>
          <Box className={classes.container}>
            <Box className={classes.form}>
              <img className={classes.img} src={Clock} alt="Check" />
              <Box className={classes.formHeader}>
                <Typography className={classes.formTitle} variant="h6">
                  Thank you! We are currently checking your data
                </Typography>
                <Typography variant="body2" className={classes.formDescription}>
                  We will send send you email with confirmation. It can take a few days...
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {sessionStatus === 'applicant_was_rejected' && (
        <Box className={classes.root}>
          <Box className={classes.container}>
            <Box className={classes.form}>
              <img className={classes.img} src={Man} alt="Rejected" />
              <Box className={classes.formHeader}>
                <Typography className={classes.formTitle} variant="h6">
                  Applicant was rejected.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
      {sessionStatus === 'account_is_whitelisted' && (
        <Box className={classes.root}>
          <Box className={classes.container}>
            <Box className={classes.form}>
              <img className={classes.img} src={Hand} alt="Approved" />
              <Box className={classes.formHeader}>
                <Typography className={classes.formTitle} variant="h6">
                  Your account has been approved.
                </Typography>
                <Typography variant="body2" className={classes.formDescription}>
                  Now you can submit DAO proposal to get paid.
                </Typography>
              </Box>
              <Box className={classes.formFooter}>
                <Button
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                  disableElevation
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CheckVerification;
