import { routes } from '../../../../../config/routes';

const { createApplicant, verifyAccount } = routes;

export const setSessionActions = async (actions, history, sessionStatus) => {
  const onGenerateSDKToken = actions.main.onGenerateSDKToken;
  if (sessionStatus === 'new') return history.replace(createApplicant);
  //  if (sessionStatus === 'registered') return await onGenerateSDKToken(history);
  return history.replace(verifyAccount);
  if (sessionStatus === 'registered') return history.replace(verifyAccount);
  if (sessionStatus === 'registered_token') return history.replace(verifyAccount);
  if (sessionStatus === 'verification_in_progress') return history.replace(verifyAccount);
  if (sessionStatus === 'applicant_was_rejected') return history.replace(verifyAccount);
  if (sessionStatus === 'account_is_whitelisted') return history.replace(verifyAccount);
};
