import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import Clock from '../img/clock.png';

const Loader = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: 'calc(100vh - 65px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
  }));

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.container}>
        <Box className={classes.form}>
          <img className={classes.img} src={Clock} title="Check" />
          <Box className={classes.formHeader}>
            <Typography className={classes.formTitle} variant="h6">
              Loading...
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Loader;
