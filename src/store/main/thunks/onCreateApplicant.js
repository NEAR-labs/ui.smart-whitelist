import { thunk } from 'easy-peasy';
import { getSignature } from '../helpers/getSignature';
import { getKeyPair } from '../helpers/getKeyPair';
import { Buffer } from 'buffer';
import { registerApplicant } from './applicant/registerApplicant';

export const onCreateApplicant = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  global.Buffer = Buffer;
  const { data } = payload;
  const state = getStoreState();
  const actions = getStoreActions();
  const wallet = state.main.entities.wallet;
  const account_id = wallet.getAccountId();
  const sessionToken = state.main.session.session_token;
  const keyPair = await getKeyPair(state);
  const signature = await getSignature(keyPair, sessionToken);
  await registerApplicant({ actions, data, account_id, signature });
});
