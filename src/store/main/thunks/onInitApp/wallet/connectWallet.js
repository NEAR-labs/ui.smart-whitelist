import { routes } from '../../../../../config/routes';
import { getDataBeforeRenderPage } from '../../../helpers/getDataBeforeRenderPage';

const onSuccess = async (state, actions, history, query) => {
  await getDataBeforeRenderPage({ state, actions, history, withLoading: false });

  const destination = routes.createApplicant;
  history.replace(destination);
};

const onError = (actions, history) => {
  actions.main.setError({
    isError: true,
    description: 'You have not connected your wallet',
  });
  history.replace(routes.connectWallet);
};

export const connectWallet = async ({ state, actions, history, query }) => {
  actions.clearTemporaryData();
  if (query.account_id) await onSuccess(state, actions, history, query);
  if (query.errorCode) onError(actions, history);
};
