import { thunk } from 'easy-peasy';
import { loadSession } from './onInitApp/session/loadSession';
import { getKeyPair } from '../helpers/getKeyPair';
import { getSignature } from '../helpers/getSignature';
import { setSessionActions } from './onInitApp/session/setSessionActions';

export const onRegisterSession = thunk(async (_, history, { getStoreState, getStoreActions }) => {
  const state = getStoreState();
  const actions = getStoreActions();
  const session_token = state.main.session.session_token;
  const sessionStatus = state.main.session.status;
  try {
    if (!session_token) {
      const wallet = state.main.entities.wallet;
      const account_id = wallet.getAccountId();
      const keyPair = await getKeyPair(state);
      const signature = await getSignature(keyPair, account_id);
      await loadSession(actions.main, history, signature, account_id);
    }
    await setSessionActions(actions.main, history, sessionStatus);
  } catch (e) {
    console.log(e);
  }
});
