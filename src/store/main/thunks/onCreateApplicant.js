import { thunk } from 'easy-peasy';
import { getSignature } from '../helpers/getSignature';
import { getKeyPair } from '../helpers/getKeyPair';
import { api } from '../../../config/api';
import { Buffer } from 'buffer';
import { routes } from '../../../config/routes';

const { home } = routes;

export const onCreateApplicant = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  global.Buffer = Buffer;
  const { history, data } = payload;
  const state = getStoreState();
  const actions = getStoreActions();
  const wallet = state.main.entities.wallet;
  const account_id = wallet.getAccountId();
  const sessionToken = state.main.session.session_token;
  const keyPair = await getKeyPair(state);
  const signature = await getSignature(keyPair, sessionToken);
  try {
    await api.registerApplicant({ data, account_id, signature });
    history.replace(home);
  } catch (e) {
    actions.main.setSession({
      session_token: null,
      status: null,
    });
    history.replace(home);
    //actions.main.setError({ description: e.message });
  }
});
