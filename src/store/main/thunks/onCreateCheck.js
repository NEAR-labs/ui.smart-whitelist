import { thunk } from 'easy-peasy';
import { getKeyPair } from '../helpers/getKeyPair';
import { getSignature } from '../helpers/getSignature';
import { api } from '../../../config/api';

export const onCreateCheck = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const state = getStoreState();
  const actions = getStoreActions();
  const { setError, onRegisterSession } = actions.main;
  try {
    const wallet = state.main.entities.wallet;
    const account_id = wallet.getAccountId();
    const sessionToken = state.main.session.session_token;
    const keyPair = await getKeyPair(state);
    const signature = await getSignature(keyPair, sessionToken);
    await api.createCheck(account_id, signature);
    await onRegisterSession();
    document.location.reload();
  } catch (e) {
    setError({
      isError: true,
      description: 'Check error...',
    });
  }
});
