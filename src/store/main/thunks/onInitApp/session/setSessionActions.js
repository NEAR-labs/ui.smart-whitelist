import { routes } from '../../../../../config/routes';

const { createApplicant, verifyAccount } = routes;

export const setSessionActions = async (actions, history, sessionStatus) => {
  const onGenerateSDKToken = actions.main.onGenerateSDKToken;
  if (sessionStatus === 'new') history.replace(createApplicant);
  if (sessionStatus === 'registered') await onGenerateSDKToken(history);
  if (sessionStatus === 'registered_token') await onGenerateSDKToken(history);
  if (sessionStatus === 'verification_in_progress') history.replace(verifyAccount);
  if (sessionStatus === 'account_is_whitelisted') history.replace(verifyAccount);
};
