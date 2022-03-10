import { api } from '../../../../config/api';

const onError = (actions) => {
  actions.main.setSession({
    session_token: null,
    status: null,
  });
  window.location.reload();
};

export const registerApplicant = async ({ actions, data, account_id, signature }) => {
  try {
    await api.registerApplicant({ data, account_id, signature });
    window.location.reload();
  } catch (e) {
    onError(actions);
  }
};
