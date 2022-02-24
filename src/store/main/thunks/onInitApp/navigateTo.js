import { matchPath } from 'react-router';
import { routes } from '../../../../config/routes';

const { root, connectWallet, createApplicant, verifyAccount } = routes;

const rootHandler = ({ replace, state }) => {
  console.log('rootHandler');
  const { wallet } = state.main.entities;
  const { onfido } = state.main;
  if (!wallet.isSignedIn()) return replace(connectWallet);
  if (wallet.isSignedIn() && !onfido.applicants.isExist) return replace(createApplicant);
};

const connectWalletHandler = ({ replace, state }) => {
  console.log('connectWalletHandler');
  const { wallet } = state.main.entities;
  const { onfido } = state.main;
  if (!wallet.isSignedIn()) return replace(connectWallet);
  if (wallet.isSignedIn() && !onfido.applicants.isExist) return replace(createApplicant);
};

const createApplicantHandler = ({ replace, state }) => {
  console.log('createApplicantHandler');
  const { wallet } = state.main.entities;
  const { onfido } = state.main;
  if (!wallet.isSignedIn()) return replace(connectWallet);
  if (wallet.isSignedIn() && !onfido.applicants.isExist) return replace(createApplicant);
};

const handlers = {
  [root]: rootHandler,
  [connectWallet]: connectWalletHandler,
  [createApplicant]: createApplicantHandler,
};

export const navigateTo = async (state, history) => {
  const mp = Object.keys(routes).find((route) =>
    matchPath({ path: routes[route], exact: true }, history.location.pathname),
  );

  if (mp) await handlers[routes[mp]]({ replace: history.replace, state });
};
