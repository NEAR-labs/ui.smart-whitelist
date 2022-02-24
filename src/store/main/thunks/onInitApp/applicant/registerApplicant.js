import { routes } from '../../../../../config/routes';

const onError = (actions, history) => {
  actions.main.setError({
    description: 'Applicant was not registered',
  });
  history.replace(routes.createAccount);
};

export const registerApplicant = async ({ state, actions, history, contract }) => {
  const key = await contract.register_applicant();
  if (!key) onError(actions, history);
};
