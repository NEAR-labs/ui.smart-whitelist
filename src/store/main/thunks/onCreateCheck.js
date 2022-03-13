import { thunk } from 'easy-peasy';
import { routes } from '../../../config/routes';
import { getKeyPair } from '../helpers/getKeyPair';
import { getSignature } from '../helpers/getSignature';
import { api } from '../../../config/api';

const { home } = routes;

export const onCreateCheck = thunk(async (_, history, { getStoreState, getStoreActions }) => {
  const state = getStoreState();
  const actions = getStoreActions();
  const wallet = state.main.entities.wallet;
  const account_id = wallet.getAccountId();
  const sessionToken = state.main.session.session_token;
  const keyPair = await getKeyPair(state);
  const signature = await getSignature(keyPair, sessionToken);
  try {
    await api.createCheck(account_id, signature);
    window.location.reload();
  } catch (e) {
    console.log(e);
    actions.main.setError({
      isError: true,
      description: 'Check error...',
    });
  }
});
