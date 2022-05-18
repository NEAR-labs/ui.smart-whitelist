import qs from 'query-string';
import { redirectPages } from '../../../config/redirectPages';
import { routes } from '../../../config/routes';

const onError = (actions, history) => {
  actions.setError({
    isError: true,
    description: 'You have not connected your wallet!',
  });
  history.replace(routes.home);
};

export const onRedirectFromWallet = async (actions, history) => {
  try {
    const query = qs.parse(history.location.search);
    const { redirectAction, errorCode } = query;
    if (errorCode) onError(actions, history);
    if (redirectAction === redirectPages.verifyAccount) {
      history.replace(routes.verifyAccount);
    }
  } catch (e) {
    console.log(`Error: ${e}`);
    onError(actions, history);
  } finally {
    document.location.reload();
  }
};
