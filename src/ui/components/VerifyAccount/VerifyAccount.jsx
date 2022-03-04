import { useEffect, useState } from 'react';
import * as OnfidoSDK from 'onfido-sdk-ui/dist/onfido.min.js';
import 'onfido-sdk-ui/dist/style.css';
import { makeStyles } from '@mui/styles';
import { useStoreActions, useStoreState } from 'easy-peasy';
import history from 'history/browser';
import { Box, Button, Typography } from '@mui/material';
import Clock from '../general/img/clock.png';

const VerifyAccount = () => {
  const onfidoToken = useStoreState((state) => state.main.onfido.sdk_token);
  const sessionStatus = useStoreState((state) => state.main.session.status);
  const actions = useStoreActions((actions) => actions.main);
  const onCreateCheck = actions.onCreateCheck;

  const onfidoContainerId = 'onfido-sdk-wrapper';

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: 'calc(100% - 64px)',
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
    onfidoSdk: {
      '& .ods-button.-action--primary': {
        backgroundColor: theme.palette.primary.main,
        textTransform: 'uppercase',
        border: 0,
      },
      '& .onfido-sdk-ui-Modal-inner': {
        border: 0,
      },
      '& .onfido-sdk-ui-Welcome-instructions': {
        textAlign: 'left',
      },
    },
  }));

  const Onfido = () => {
    useEffect(() => {
      if (onfidoToken)
        OnfidoSDK.init({
          token: onfidoToken,
          containerId: onfidoContainerId,
          onComplete: function (data) {
            onCreateCheck(history);
          },
          onUserExit: function (userExitCode) {
            console.log(userExitCode);
          },
          steps: [
            'welcome',
            {
              type: 'document',
              options: {
                documentTypes: {
                  /*               driving_licence: {
                    country: null,
                  },*/
                  driving_licence: true,
                  passport: true,
                  national_identity_card: true,
                  residence_permit: true,
                  showCountrySelection: false,
                },
              },
            },
            'face',
            'complete',
          ],
        });
    }, []);

    return <div id={onfidoContainerId} />;
  };

  const handleSubmit = () => {
    console.log('submit');
  };

  const classes = useStyles();

  return (
    <>
      <div className={classes.onfidoSdk}>{sessionStatus === 'registered_token' && <Onfido />}</div>
      <Box className={classes.root}>
        <Box className={classes.container}>
          {sessionStatus === 'verification_in_progress' && (
            <Box className={classes.form}>
              <img className={classes.img} src={Clock} title="Check" />
              <Box className={classes.formHeader}>
                <Typography className={classes.formTitle} variant="h6">
                  Thank you! We are currently checking your data
                </Typography>
                <Typography variant="body2" className={classes.formDescription}>
                  We will send send you email with confirmation. It can take a few days...
                </Typography>
              </Box>
            </Box>
          )}
          {sessionStatus === 'account_is_whitelisted' && (
            <Box className={classes.form}>
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
          )}
        </Box>
      </Box>
    </>
  );
};

export default VerifyAccount;
