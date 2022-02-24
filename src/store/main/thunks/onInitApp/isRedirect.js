import qs from 'query-string';
import { matchPath } from 'react-router';
import { routes } from '../../../../config/routes';

export const isRedirect = (state, history) => {
  const { redirectAction } = qs.parse(history.location.search);

  console.log(state.main.temporary.redirectAction, redirectAction);

  const match = matchPath(
    {
      path: routes.redirectFromWallet,
      exact: true,
    },
    history.location.pathname,
  );

  return (
    typeof redirectAction === 'string' &&
    match &&
    state.main.temporary.redirectAction === redirectAction
  );
};
