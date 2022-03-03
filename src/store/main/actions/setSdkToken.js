import { action } from 'easy-peasy';

export const setSdkToken = action((state, payload) => {
  state.onfido = payload;
});
