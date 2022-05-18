import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    width: '100%',
    maxWidth: 560,
    backgroundColor: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  formHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formTitle: {
    fontSize: '20px !important',
    fontWeight: '700 !important',
  },
  formDescription: {
    textAlign: 'left',
    fontSize: '16px !important',
  },
  inputGroup: {
    marginBottom: '24px !important',
    textAlign: 'left',
    '& .MuiDivider-root::before': {
      width: '0 !important',
    },
  },
  formGroup: {
    flexDirection: 'row !important',
  },
  formFooter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  button: {
    borderRadius: '12px !important',
    paddingRight: '49px !important',
    paddingLeft: '49px !important',
  },
});

export const useStyles = makeStyles(styles, { name: 'CreateProposal' });
