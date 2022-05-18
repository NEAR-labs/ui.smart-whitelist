import makeStyles from '@mui/styles/makeStyles';
import { Box } from '@mui/material';
import React from 'react';

const styles = (theme) => ({
  container: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: '1fr minmax(386px, 1fr)',
    flex: 'auto',
    maxWidth: 1144,
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column-reverse',
    },
  },
  content: {},
  textBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  title: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  description: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  imageBox: {},
});

export const useStyles = makeStyles(styles, { name: 'WelcomePage' });
