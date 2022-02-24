import { getSignature } from '../../../helpers/getSignature';
import { api } from '../../../../../config/api';
import { routes } from '../../../../../config/routes';

const { createApplicant } = routes;

const onSuccess = async (state, actions, history, query) => {
  const destination = routes.createApplicant;
  history.replace(destination);
};

const onError = ({ actions, history, error }) => {
  actions.setError({
    isError: true,
    description: error,
  });
  history.replace(createApplicant);
};

export const registerSession = async ({ state, actions, history }) => {
  const wallet = state.main.entities.wallet;
  const accountId = wallet.getAccountId();
  const { signature } = await getSignature(state);
  console.log(signature);

  try {
    const query = await api.registerSession(accountId, signature);
    if (!query.error) await onSuccess({ state, actions, history, query });
  } catch (e) {
    //      if (query.error) onError({ state, actions, history, query });
    onError({ state, actions, history, e });
  }
};
