import { action } from 'easy-peasy';

export const setSession = action((state, payload) => {
  state.session = Object.assign({}, state.session, payload);
});
