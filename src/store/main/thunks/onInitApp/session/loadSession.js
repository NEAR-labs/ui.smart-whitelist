import { api } from '../../../../../config/api';
import { routes } from '../../../../../config/routes';
import { getSessionStatus } from '../../../helpers/getSessionStatus';
import { setSessionActions } from './setSessionActions';

const { home } = routes;

const onSuccess = async (actions, history, response) => {
  const sessionToken = response.status;
  const setSession = actions.setSession;
  setSession(response);
  await setSessionActions(actions, history, sessionToken);
};

const onError = ({ actions, history }) => {
  actions.setSession({
    session_token: null,
    status: null,
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
