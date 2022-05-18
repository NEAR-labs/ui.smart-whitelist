import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CreateApplicant from '../../ui/components/KYCSteps/CreateApplicant/CreateApplicant';
import VerifyAccount from '../../ui/components/KYCSteps/VerifyAccount/VerifyAccount';
import Header from '../../ui/components/Header/Header';
import CheckVerification from '../../ui/components/KYCSteps/CheckVerification/CheckVerification';
import Loader from '../../ui/components/general/Loader/Loader';
import KYCSteps from '../../ui/components/KYCSteps/KYCSteps';

const KYCStepperPage = () => {
  const sessionStatus = useStoreState((state) => state.main.session.status);
  const { onRegisterContract, onRegisterSession } = useStoreActions((actions) => actions.main);
  const isLoading = useStoreState((state) => state.main.isLoading);

  useEffect(() => {
    (async () => {
      if (!sessionStatus) {
        await onRegisterContract();
        await onRegisterSession();
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f7f7f7',
        }}
      >
        {!isLoading ? <>{sessionStatus && <KYCSteps status={sessionStatus} />}</> : <Loader />}
      </Box>
    </>
  );
};

export default KYCStepperPage;
