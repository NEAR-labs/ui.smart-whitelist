import qs from 'query-string';
import { matchPath } from 'react-router';
import { routes } from '../../../../config/routes';

export const isRedirect = (state, history) => {
  const { redirectAction } = qs.parse(history.location.search);

  const match = matchPath(
    {
      path: routes.redirectFromWallet,
      exact: true,
    },
    history.location.pathname,
  );

  console.log(redirectAction, state.main.temporary.redirectAction);

  return (
    typeof redirectAction === 'string' &&
    match &&
    state.main.temporary.redirectAction === redirectAction
  );
};
