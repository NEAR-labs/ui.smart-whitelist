import { thunk } from 'easy-peasy';
import { getSignature } from '../helpers/getSignature';
import { api } from '../../../config/api';
import { registerSession } from './onInitApp/session/registerSession';

export const onRegisterSession = thunk(async (actions, history, { getStoreState }) => {
  const state = getStoreState();
  await registerSession({ state, actions, history });
});
