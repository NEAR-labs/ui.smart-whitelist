import { action } from 'easy-peasy';
import { persistInitState as main } from '../main/initState';

export const resetState = action((state) => {
  state.main = main;
});
