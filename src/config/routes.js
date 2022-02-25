import qs from 'query-string';

export const routes = {
  home: '/',
  connectWallet: '/connect-wallet',
  createApplicant: '/create-applicant',
  verifyAccount: '/verify-account',
  redirectFromWallet: '/redirect-from-wallet',
};

export const getRoute = {
  callbackUrl: (params) => `${window.location.origin}/redirect-from-wallet?${qs.stringify(params)}`,
};
