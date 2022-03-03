import { routes } from '../../../../../config/routes';

const { createApplicant } = routes;

export const setSessionActions = async (actions, history, sessionStatus) => {
  console.log(history);
  const onGenerateSDKToken = actions.onGenerateSDKToken;
  if (sessionStatus === 'new') history.replace(createApplicant);
  if (sessionStatus === 'registered') await onGenerateSDKToken(history);
  if (sessionStatus === 'registered_token') await onGenerateSDKToken(history);
};
