import { persist } from 'easy-peasy';
import { redirectPages } from '../../config/redirectPages';

const initState = {
  isLoading: false,
  error: {
    isError: false,
    description: '',
  },
  entities: {
    near: null,
    keyStore: null,
    wallet: null,
  },
  session: {
    session_token: null,
    status: null,
  },
  temporary: {},
  navigation: { page: redirectPages.connectWallet },
};

export const persistInitState = persist(initState, {
  storage: 'localStorage',
});
