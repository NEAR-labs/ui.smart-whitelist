import { matchPath } from 'react-router';
import { routes } from '../../../config/routes';

const { session, createApplicant } = routes;

export const getDataBeforeRenderPage = async ({ state, actions, history, withLoading }) => {
  const onRegisterSession = actions.onRegisterSession;
  const onRegisterApplicant = actions.onRegisterApplicant;

  const mp = Object.keys(routes).find((route) =>
    matchPath({ path: routes[route], exact: true }, history.location.pathname),
  );

  if (!mp) return;

  const ifRouteIs = (route) => route === routes[mp];

  //  ifRouteIs(createApplicant) && (await onRegisterApplicant());
  await onRegisterApplicant();
  //  ifRouteIs(createApplicant) && (await onRegisterSession());
  await onRegisterSession(history);
};
