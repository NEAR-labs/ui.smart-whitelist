import { createStore } from 'easy-peasy';
import { actions } from './actions';
import { main } from './main';

export const store = createStore(
  {
    ...actions,
    main,
  },
  {
    name: 'SmartWhitelist',
  },
);
