import { useStoreActions, useStoreState } from 'easy-peasy';
import { makeStyles } from '@mui/styles';
import { Paper, Button } from '@mui/material';
import Modal from '@mui/material/Modal';

export const Error = () => {
  const isError = useStoreState((store) => store.main.error.isError);
  const description = useStoreState((store) => store.main.error.description);
  const resetError = useStoreActions((actions) => actions.main.resetError);

  const useStyles = makeStyles(() => ({
    modal: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
    <Modal
      className={classes.modal}
      open={isError}
      onClose={resetError}
      BackdropProps={{ invisible: true }}
    >
      <Paper className={classes.container} elevation={5}>
        <h2 className={classes.header}>Something went wrong ...</h2>
        <p>{description}</p>
        <div className={classes.footer}>
          <Button color="primary" className={classes.button} onClick={resetError}>
            Got It
          </Button>
        </div>
      </Paper>
    </Modal>
  );
};
