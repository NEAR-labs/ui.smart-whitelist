import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import React, { useEffect, useState } from 'react';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CancelIcon from '@mui/icons-material/Cancel';
import { pink } from '@mui/material/colors';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Box from '@mui/material/Box';
import CreateApplicant from './CreateApplicant/CreateApplicant';
import VerifyAccount from './VerifyAccount/VerifyAccount';
import CheckVerification from './CheckVerification/CheckVerification';

const steps = [
  { label: 'Connect Wallet', value: 'connect' },
  { label: 'Account details', value: 'new' },
  { label: 'Verify you account', value: 'verify' },
  { label: 'Submit your proposal', value: 'proposal' },
];

function statusToStep(status) {
  const steps = {
    connect: 'connect',
    new: 'new',
    registered: 'verify',
    registered_token: 'verify',
    verification_in_progress: 'verify',
    applicant_was_rejected: 'verify',
    account_is_whitelisted: 'proposal',
  };
  return steps[status];
}

const stepIcons = {
  new: <PanoramaFishEyeIcon color="primary" />,
  registered: <PanoramaFishEyeIcon color="primary" />,
  registered_token: <PanoramaFishEyeIcon color="primary" />,
  verification_in_progress: <AccessTimeIcon color="primary" />,
  account_is_whitelisted: <PanoramaFishEyeIcon color="primary" />,
  applicant_was_rejected: <CancelIcon sx={{ color: pink[500] }} />,
  default: <PanoramaFishEyeIcon color="primary" />,
};

const KYCSteps = ({ status }) => {
  const [step, setStep] = useState(null);
  const { isRejected } = useStoreState((state) => state.main.session);
  const { onRegisterSession, onGenerateSDKToken } = useStoreActions((actions) => actions.main);
  const onfidoToken = useStoreState((state) => state.main.onfido.sdk_token);

  useEffect(() => {
    (async () => {
      if (!isRejected) {
        if (status === 'registered') {
          await onRegisterSession();
          if (!onfidoToken) {
            await onGenerateSDKToken();
          }
        }
      }
      setStep(statusToStep(status));
    })();
  }, [status]);

  console.log(status);

  const activeStep = () => {
    return steps.findIndex((item) => item.value === step);
  };

  const completedSteps = (index) => {
    return index < activeStep();
  };

  const getIcon = (status, index) => {
    if (activeStep() === index) return stepIcons[status];
    if (completedSteps(index)) return null;
    return stepIcons['default'];
  };

  return (
    <>
      <Stepper sx={{ maxWidth: 580, marginTop: 4 }} activeStep={activeStep()} alternativeLabel>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepButton color="inherit" icon={getIcon(status, index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      {status && (
        <Box display="flex" flexDirection="column" sx={{ width: 1, height: 1 }}>
          {status === 'new' && <CreateApplicant />}
          {status === 'registered_token' && <VerifyAccount />}
          {status === 'verification_in_progress' && <CheckVerification />}
          {status === 'account_is_whitelisted' && <CheckVerification />}
          {status === 'applicant_was_rejected' && <CheckVerification />}
        </Box>
      )}
    </>
  );
};

export default KYCSteps;
