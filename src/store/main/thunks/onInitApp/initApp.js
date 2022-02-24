import { thunk } from 'easy-peasy';
import { getNearApi } from '../../helpers/getNearApi';
import { checkUserAccounts } from './checkUserAccounts';
import { isRedirect } from './isRedirect';
import { redirectFromWallet } from './wallet/redirectFromWallet';
import { navigateTo } from './navigateTo';
import { getDataBeforeRenderPage } from '../../helpers/getDataBeforeRenderPage';
import { Buffer } from 'buffer';

export const initApp = thunk(async (actions, payload, helpers) => {
  try {
    global.Buffer = Buffer;
    const { history, setInit } = payload;
    const setNearApi = actions.setNearApi;

    setNearApi(await getNearApi());

    const state = helpers.getStoreState();

    await checkUserAccounts(state, actions, history);

    if (isRedirect(state, history)) {
      await redirectFromWallet(state, actions, history);
    } else {
      await navigateTo(state, history);
    }

    // await getDataBeforeRenderPage({ state, actions, history, withLoading: false });

    setInit(true);
  } catch (e) {
    console.log(`Error: ${e}`);
  }
});
