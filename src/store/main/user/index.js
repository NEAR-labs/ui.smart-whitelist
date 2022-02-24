import { actions } from './actions';
import { initState } from './initState';

export const user = {
  ...initState,
  ...actions,
};
