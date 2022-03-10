import { thunk } from 'easy-peasy';
import { loadSession } from './onInitApp/session/loadSession';
import { getKeyPair } from '../helpers/getKeyPair';
import { getSignature } from '../helpers/getSignature';
import moment from 'moment';

export const onRegisterSession = thunk(async (_, history, { getStoreState, getStoreActions }) => {
  const state = getStoreState();
  const actions = getStoreActions();
  const wallet = state.main.entities.wallet;
  const account_id = wallet.getAccountId();
  const keyPair = await getKeyPair(state);
  const signature = await getSignature(keyPair, `${account_id}-${moment().format('YYYY-MM-DD')}`);
  await loadSession(actions, history, signature, account_id);
});
