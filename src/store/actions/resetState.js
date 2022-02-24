import { action } from 'easy-peasy';
import { persistInitState as main } from '../main/initState';
import { initState as user } from '../main/user/initState';

export const resetState = action((state) => {
  state.main = main;
  state.main.user = user;
});
