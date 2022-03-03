import { matchPath } from 'react-router';
import { routes } from '../../../../config/routes';

const { home, connectWallet, createApplicant, verifyAccount } = routes;

const rootHandler = ({ replace, state }) => {
  console.log('rootHandler');
  const { wallet } = state.main.entities;
  if (!wallet.isSignedIn()) return replace(connectWallet);
  return replace(home);
};

const connectWalletHandler = ({ replace, state }) => {
  console.log('connectWalletHandler');
  const { wallet } = state.main.entities;
  if (!wallet.isSignedIn()) return replace(connectWallet);
  return replace(home);
};

const createApplicantHandler = ({ replace, state }) => {
  console.log('createApplicantHandler');
  const { wallet } = state.main.entities;
  if (!wallet.isSignedIn()) return replace(connectWallet);
  return replace(home);
};

const verifyAccountHandler = ({ replace, state }) => {
  console.log('verifyAccountHandler');
  const { wallet } = state.main.entities;
  if (!wallet.isSignedIn()) return replace(connectWallet);
  return replace(verifyAccount);
};

const handlers = {
  [home]: rootHandler,
  [connectWallet]: connectWalletHandler,
  [createApplicant]: createApplicantHandler,
  [verifyAccount]: verifyAccountHandler,
};

export const navigateTo = async (state, history) => {
  const mp = Object.keys(routes).find((route) =>
    matchPath({ path: routes[route], exact: true }, history.location.pathname),
  );

  if (mp) await handlers[routes[mp]]({ replace: history.replace, state });
};
