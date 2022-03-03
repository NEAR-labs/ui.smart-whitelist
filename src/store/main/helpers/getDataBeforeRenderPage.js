import { matchPath } from 'react-router';
import { routes } from '../../../config/routes';

const { home } = routes;

export const getDataBeforeRenderPage = async ({ actions, history, withLoading }) => {
  const onRegisterSession = actions.onRegisterSession;
  const onRegisterContract = actions.onRegisterContract;

  const match = Object.keys(routes).find((route) =>
    matchPath({ path: routes[route], exact: true }, history.location.pathname),
  );

  if (!match) return;

  const ifRouteIs = (route) => route === routes[match];

  ifRouteIs(home) && (await onRegisterContract(history));
  ifRouteIs(home) && (await onRegisterSession(history));
};
