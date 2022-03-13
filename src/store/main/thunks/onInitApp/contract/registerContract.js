import { routes } from '../../../../../config/routes';

const { home } = routes;

const onError = (actions, history) => {
  actions.main.setError({
    description: 'Applicant was not registered',
  });
  history.replace(home);
};

export const registerContract = async ({ actions, history, contract }) => {
  try {
    await contract.register_applicant();
  } catch (e) {
    onError(actions, history);
  }
};
