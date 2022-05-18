import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Error } from './components/general/Error/Error';
import WelcomePage from '../pages/WelcomePage/WelcomePage';
import { useStoreState } from 'easy-peasy';
import KYCStepperPage from '../pages/KYCStepperPage/KYCStepperPage';
import CreateProposal from '../pages/CreateProposal/CreateProposal';

const App = ({ history }) => {
  const isError = useStoreState((store) => store.main.error.isError);
  return (
    <>
      <Routes>
        <Route index path="/" element={<WelcomePage />} />
        <Route path="verify-account" element={<KYCStepperPage history={history} />} />
        <Route path="create-proposal" element={<CreateProposal history={history} />} />
      </Routes>
      {isError && <Error isError={isError} />}
    </>
  );
};

export default App;
