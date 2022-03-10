import { useStoreActions, useStoreState } from 'easy-peasy';
import { makeStyles } from '@mui/styles';
import { Paper, Button } from '@mui/material';
import Box from '@mui/material/Box';

export const Error = () => {
  const isError = useStoreState((store) => store.main.error.isError);
  const description = useStoreState((store) => store.main.error.description);
  const removeError = useStoreActions((actions) => actions.main.removeError);

  const useStyles = makeStyles(() => ({
    root: {
      height: 'calc(100% - 65px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fafafa',
    },
    container: {
      width: 360,
      display: 'flex',
      flexDirection: 'column',
      outline: 'none',
      borderRadius: 8,
      padding: 16,
    },
    header: {
      color: 'rgba(0, 0, 0, 0.87)',
      fontWeight: 900,
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  }));

  const classes = useStyles();

  if (!isError) return null;

  return (
    <Box className={classes.root}>
      <Paper className={classes.container} elevation={0}>
        <h2 className={classes.header}>Something went wrong ...</h2>
        <p>{description}</p>
        {/*        <div className={classes.footer}>
          <Button color="primary" className={classes.button} onClick={removeError}>
            Got It
          </Button>
        </div>*/}
      </Paper>
    </Box>
  );
};
