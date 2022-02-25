import { api } from '../../../../../config/api';
import { routes } from '../../../../../config/routes';
import { getSessionStatus } from '../../../helpers/getSessionStatus';

const { home } = routes;

const onSuccess = async (actions, history, response) => {
  const destination = getSessionStatus[response.status];
  const setSession = actions.setSession;
  setSession(response);
  history.replace(destination);
};

const onError = ({ actions, history }) => {
  actions.setSession({
    session_token: null,
    status: null,
  });
  console.log(history);
  history.replace(home);
};

export const getSession = async (state, actions, history, signature, account_id) => {
  try {
    const response = await api.registerSession(account_id, signature);
    if (response) await onSuccess(actions, history, response);
  } catch (e) {
    onError({ state, actions, history, e });
  }
};
