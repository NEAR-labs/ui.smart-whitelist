import { thunk } from 'easy-peasy';
import { getSession } from '../helpers/getSession';
import { getKeyPair } from '../helpers/getKeyPair';
import { getSignature } from '../helpers/getSignature';
import moment from 'moment';

export const onRegisterSession = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  const state = getStoreState();
  const actions = getStoreActions();
  const { enableLoading, disableLoading } = actions.main;
  try {
    const wallet = state.main.entities.wallet;
    const account_id = wallet?.getAccountId();
    if (account_id) {
      enableLoading();
      const keyPair = await getKeyPair(state);
      const signature = await getSignature(
        keyPair,
        `${account_id}-${moment().format('YYYY-MM-DD')}`,
      );
      await getSession(actions, signature, account_id);
    }
  } catch (e) {
    console.log(`Error: ${e}`);
  } finally {
    disableLoading();
  }
});
