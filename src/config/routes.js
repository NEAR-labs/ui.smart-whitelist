import qs from 'query-string';

export const routes = {
  home: '/',
  verifyAccount: '/verify-account',
  createProposal: '/create-proposal',
  redirectFromWallet: '/redirect-from-wallet',
};

export const getRoute = {
  callbackUrl: (params) => `${window.location.origin}/redirect-from-wallet?${qs.stringify(params)}`,
};
