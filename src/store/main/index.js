import { persist } from 'easy-peasy';
import { persistInitState } from './initState';
import { actions } from './actions';
import { thunks } from './thunks';

export const main = persist(
  {
    ...persistInitState,
    ...actions,
    ...thunks,
  },
  {
    storage: 'localStorage',
    allow: ['session', 'onfido', 'temporary', 'error'],
  },
);
