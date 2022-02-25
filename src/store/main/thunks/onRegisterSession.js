import { thunk } from 'easy-peasy';
import { getSession } from './onInitApp/session/getSession';
import { getSessionStatus } from '../helpers/getSessionStatus';
import { getKeyPair } from '../helpers/getKeyPair';
import { getSignature } from '../helpers/getSignature';

export const onRegisterSession = thunk(async (actions, history, { getStoreState }) => {
  const state = getStoreState();
  const wallet = state.main.entities.wallet;
  const account_id = wallet.getAccountId();
  const keyPair = await getKeyPair(state);
  const sessionStatus = state.main.session.status;
  const signature = await getSignature(keyPair, account_id);
  await getSession(state, actions, history, signature, account_id);
  history.replace(getSessionStatus[sessionStatus]);
});
