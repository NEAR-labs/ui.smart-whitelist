import { useStoreActions } from 'easy-peasy';
import { makeStyles } from '@mui/styles';
import { Box, Button, Typography } from '@mui/material';

const ConnectWallet = () => {
  const onConnectWallet = useStoreActions((actions) => actions.main.onConnectWallet);

  const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
      height: '100%',
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

  const handleConnectWallet = () => {
    onConnectWallet();
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.form}>
          <Box className={classes.formHeader}>
            <Typography className={classes.formTitle} variant="h6">
              Connect Wallet
            </Typography>
            <Typography variant="body2" className={classes.formDescription}>
              Connect your wallet to create a payout proposal
            </Typography>
          </Box>
          <Box className={classes.formFooter}>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              onClick={handleConnectWallet}
              disableElevation
            >
              Connect wallet
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ConnectWallet;
