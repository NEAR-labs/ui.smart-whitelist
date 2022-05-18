import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Paper, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useStyles } from './Error.styles';

export const Error = ({ isError }) => {
  const description = useStoreState((store) => store.main.error.description);
  const resetError = useStoreActions((actions) => actions.main.resetError);

  const classes = useStyles();

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
