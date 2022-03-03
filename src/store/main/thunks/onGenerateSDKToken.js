import { thunk } from 'easy-peasy';
import { Buffer } from 'buffer';
import { getKeyPair } from '../helpers/getKeyPair';
import { getSignature } from '../helpers/getSignature';
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
    const session_token = state.main.session.session_token;
    const keyPair = await getKeyPair(state);
    const signature = await getSignature(keyPair, session_token);
    const sdk = await api.generateSDKToken(account_id, signature);
    actions.main.setSdkToken(sdk);
    history.replace(verifyAccount);
  } catch (e) {
    actions.main.setSession({
      session_token: null,
      status: null,
    });
    history.replace(home);
    //actions.setError({ description: e.message });
  }
});
