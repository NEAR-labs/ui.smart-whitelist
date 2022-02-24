import qs from 'query-string';
import { connectWallet } from './connectWallet';
import { redirectPages } from '../../../../../config/redirectPages';

export const redirectFromWallet = async (state, actions, history) => {
  const query = qs.parse(history.location.search);
  const { redirectAction } = query;

  if (redirectAction === redirectPages.connectWallet)
    await connectWallet({ state, actions, history, query });
};
