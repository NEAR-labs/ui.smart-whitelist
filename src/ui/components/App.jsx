import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ConnectWallet from './ConnectWallet/ConnectWallet';
import { routes } from '../../config/routes';
import VerifyAccount from './VerifyAccount/VerifyAccount';
import Header from './Header/Header';
import CreateApplicant from './CreateApplicant/CreateApplicant';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ConnectWallet />} />
        <Route path={routes.connectWallet} element={<ConnectWallet />} />
        <Route path={routes.createApplicant} element={<CreateApplicant />} />
        <Route path={routes.verifyAccount} element={<VerifyAccount />} />
        <Route path="*" render={() => <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;