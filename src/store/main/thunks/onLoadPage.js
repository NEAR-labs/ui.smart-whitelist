import { matchPath } from 'react-router';
import { routes } from '../../../config/routes';

const { home, verifyAccount, createProposal } = routes;

const rootHandler = ({ replace, state }) => {
  console.log('rootHandler');
  const { wallet } = state.main.entities;
  if (!wallet.isSignedIn()) return replace(home);
  return replace(verifyAccount);
};

const verifyAccountHandler = ({ replace, state }) => {
  console.log('verifyAccountHandler');
  const { wallet } = state.main.entities;
  if (!wallet.isSignedIn()) return replace(home);
  return replace(verifyAccount);
};

const createProposalHandler = ({ replace, state }) => {
  console.log('createProposalHandler');
  const { wallet } = state.main.entities;
  const isWhiteListed = state.main.session.status === 'account_is_whitelisted';
  if (!wallet.isSignedIn()) return replace(home);
  if (!isWhiteListed) return replace(home);
  return replace(createProposal);
};

const handlers = {
  [home]: rootHandler,
  [verifyAccount]: verifyAccountHandler,
  [createProposal]: createProposalHandler,
};

export const onLoadPage = async (state, history) => {
  const mp = Object.keys(routes).find((route) =>
    matchPath({ path: routes[route], exact: true }, history.location.pathname),
  );

  if (mp) await handlers[routes[mp]]({ replace: history.replace, state });
};
