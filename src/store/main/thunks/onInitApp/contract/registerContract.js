import { routes } from '../../../../../config/routes';

const { home } = routes;

const onError = (actions, history) => {
  actions.main.setError({
    description: 'Applicant was not registered',
  });
  history.replace(home);
};

export const registerContract = async ({ actions, history, contract }) => {
  const key = await contract.register_applicant();
  if (!key) onError(actions, history);
};
