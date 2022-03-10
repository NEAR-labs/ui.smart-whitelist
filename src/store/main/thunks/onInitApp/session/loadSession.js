import { api } from '../../../../../config/api';
import { routes } from '../../../../../config/routes';
import { setSessionActions } from './setSessionActions';
const { home } = routes;

const onSuccess = async (actions, history, response) => {
  const sessionStatus = response.status;
  const setSession = actions.main.setSession;
  setSession(response);
  await setSessionActions(actions, history, sessionStatus);
};

const onError = ({ actions, history }) => {
  actions.main.setSession({
    session_token: null,
    status: null,
  });
  actions.main.setError({
    isError: true,
    description: 'Session is not registered',
  });
  history.replace(home);
};

export const loadSession = async (actions, history, signature, account_id) => {
  try {
    const response = await api.registerSession(account_id, signature);
    if (response) await onSuccess(actions, history, response);
  } catch (e) {
    onError({ actions, history });
  }
};
