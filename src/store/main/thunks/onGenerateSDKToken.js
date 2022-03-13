import { thunk } from 'easy-peasy';
import { Buffer } from 'buffer';
import { api } from '../../../config/api';
import { routes } from '../../../config/routes';

const { home, verifyAccount } = routes;

export const onGenerateSDKToken = thunk(async (_, history, { getStoreState, getStoreActions }) => {
  global.Buffer = Buffer;
  const state = getStoreState();
  const actions = getStoreActions();
  try {
    const wallet = state.main.entities.wallet;
    const account_id = wallet.getAccountId();
    const sdk = await api.generateSDKToken(state, account_id);
    actions.main.setSdkToken(sdk);
    history.push(verifyAccount);
  } catch (e) {
    actions.main.setSession({
      session_token: null,
      status: null,
    });
    history.replace(home);
  }
});
