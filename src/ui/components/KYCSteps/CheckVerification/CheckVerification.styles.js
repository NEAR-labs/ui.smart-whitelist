import makeStyles from '@mui/styles/makeStyles';

const styles = (theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  container: {
    maxWidth: '100%',
    width: 560,
    maxHeight: 208,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    marginTop: 64,
    marginBottom: 64,
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
    color: '#555',
    textAlign: 'left',
    fontSize: '16px !important',
  },
  formFooter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  button: {
    paddingRight: '49px !important',
    paddingLeft: '49px !important',
    borderRadius: 12,
  },
});

export const useStyles = makeStyles(styles, { name: 'CheckVerification' });
