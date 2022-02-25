import { matchPath } from 'react-router';
import { routes } from '../../../config/routes';

const { home } = routes;

export const getDataBeforeRenderPage = async ({ state, actions, history, withLoading }) => {
  const onRegisterSession = actions.onRegisterSession;
  const onRegisterContract = actions.onRegisterContract;

  const mp = Object.keys(routes).find((route) =>
    matchPath({ path: routes[route], exact: true }, history.location.pathname),
  );

  if (!mp) return;

  const ifRouteIs = (route) => route === routes[mp];

  ifRouteIs(home) && (await onRegisterContract(history));
  ifRouteIs(home) && (await onRegisterSession(history));
};
