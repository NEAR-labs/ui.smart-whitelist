import { thunk } from 'easy-peasy';
import { getNearApi } from '../helpers/getNearApi';
import { isRedirectFromWallet } from '../helpers/isRedirectFromWallet';
import { onRedirectFromWallet } from './onRedirectFromWallet';
import { onLoadPage } from './onLoadPage';
import { Buffer } from 'buffer';

export const onInitApp = thunk(async (actions, payload, helpers) => {
  global.Buffer = Buffer;
  const { history, setInit } = payload;
  const { setNearApi, setError } = actions;
  try {
    setNearApi(await getNearApi());

    const state = helpers.getStoreState();

    if (isRedirectFromWallet(state, history)) {
      await onRedirectFromWallet(actions, history);
    } else {
      await onLoadPage(state, history);
    }

    setInit(true);
  } catch (e) {
    setError({
      isError: true,
      description: 'Application is not loaded. Please try again letter.',
    });
  }
});
