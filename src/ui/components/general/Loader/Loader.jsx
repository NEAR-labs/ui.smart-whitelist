import clock from '../img/clock.png';
import { makeStyles } from '@mui/styles';

const Loader = () => {
  const useStyles = makeStyles((theme) => ({
    wrapper: {
      width: '100%',
      height: ' 100%',
    },
    loader: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      height: 120,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.loader}>Loading....</div>
    </div>
  );
};

export default Loader;
