import { thunk } from 'easy-peasy';
import { Buffer } from 'buffer';
import { api } from '../../../config/api';

export const onGenerateSDKToken = thunk(async (_, payload, { getStoreState, getStoreActions }) => {
  global.Buffer = Buffer;
  const state = getStoreState();
  const actions = getStoreActions();
  const { enableLoading, disableLoading, setSdkToken, setSession, onRegisterSession } =
    actions.main;
  try {
    enableLoading();
    const wallet = state.main.entities.wallet;
    const account_id = wallet.getAccountId();
    const sdk = await api.generateSDKToken(state, account_id);
    setSdkToken(sdk);
    await onRegisterSession();
  } catch (e) {
    setSession({
      session_token: null,
      status: null,
      isRejected: false,
    });
  } finally {
    disableLoading();
  }
});
