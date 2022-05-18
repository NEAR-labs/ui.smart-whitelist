import { thunk } from 'easy-peasy';
import { getSignature } from '../helpers/getSignature';
import { getKeyPair } from '../helpers/getKeyPair';
import { Buffer } from 'buffer';
import { api } from '../../../config/api';

export const onCreateApplicant = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  global.Buffer = Buffer;
  const { data } = payload;
  const state = getStoreState();
  const actions = getStoreActions();
  const { setError, setSession, onRegisterSession } = actions.main;
  try {
    const wallet = state.main.entities.wallet;
    const account_id = wallet.getAccountId();
    const sessionToken = state.main.session.session_token;
    const keyPair = await getKeyPair(state);
    const signature = await getSignature(keyPair, sessionToken);
    await api.registerApplicant({ data, account_id, signature });
    await onRegisterSession();
  } catch (e) {
    setError({
      isError: true,
      description: 'Please try again latter.',
    });
    setSession({
      session_token: null,
      status: null,
    });
  }
});
