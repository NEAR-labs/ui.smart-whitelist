import { action } from 'easy-peasy';

export const setSdkToken = action((state, payload) => {
  console.log('payload', payload);
  state.onfido = payload;
});
