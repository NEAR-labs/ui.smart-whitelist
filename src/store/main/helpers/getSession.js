import { api } from '../../../config/api';

const onSuccess = async (actions, response) => {
  const setSession = actions.main.setSession;
  setSession({ ...response, isRejected: false });
};

const onError = ({ actions }) => {
  actions.main.setSession({
    session_token: null,
    status: null,
  });
  actions.main.setError({
    isError: true,
    description: 'Session is not registered',
  });
};

export const getSession = async (actions, signature, account_id) => {
  try {
    const response = await api.registerSession(account_id, signature);
    if (response) await onSuccess(actions, response);
  } catch (e) {
    onError({ actions });
  }
};
