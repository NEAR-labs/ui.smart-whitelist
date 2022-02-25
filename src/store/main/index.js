import { persist } from 'easy-peasy';
import { persistInitState } from './initState';
import { actions } from './actions';
import { thunks } from './thunks';
import { onfido } from './onfido';

export const main = persist(
  {
    ...persistInitState,
    ...actions,
    ...thunks,
    onfido,
  },
  {
    storage: 'localStorage',
    allow: ['session', 'onfido', 'temporary'],
  },
);
