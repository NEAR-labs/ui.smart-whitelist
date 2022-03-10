import { Routes, Route, Navigate } from 'react-router-dom';
import ConnectWallet from './ConnectWallet/ConnectWallet';
import { routes } from '../../config/routes';
import VerifyAccount from './VerifyAccount/VerifyAccount';
import CreateApplicant from './CreateApplicant/CreateApplicant';
import CreateProposal from './CreateProposal/CreateProposal';
import { makeStyles } from '@mui/styles';
import PageLayout from './PageLayout/PageLayout';
import { Error } from './Error/Error';

const App = ({ history }) => {
  const useStyles = makeStyles(() => ({
    root: {
      width: '100vw',
      height: '100vh',
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Routes>
        <Route path="/" element={<PageLayout {...history} />}>
          <Route index path={routes.connectWallet} element={<ConnectWallet />} />
          <Route path={routes.createApplicant} element={<CreateApplicant history={history} />} />
          <Route path={routes.verifyAccount} element={<VerifyAccount history={history} />} />
          <Route path={routes.createProposal} element={<CreateProposal history={history} />} />
          <Route path="*" render={() => <Navigate to="/" />} />
        </Route>
      </Routes>
      <Error />
    </div>
  );
};

export default App;
