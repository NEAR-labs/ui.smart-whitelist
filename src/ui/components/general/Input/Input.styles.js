import { makeStyles } from '@mui/styles';

const styles = {
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
};

export const useStyles = makeStyles(styles, { name: 'Input' });
