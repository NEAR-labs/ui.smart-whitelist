import { thunk } from 'easy-peasy';
import { redirectPages } from '../../../config/redirectPages';

export const onVerifyAccount = thunk(async (actions, payload, __) => {
  const redirectAction = redirectPages.verifyAccount;
  const setApplicants = actions.onfido.setApplicants;

  setApplicants({
    applicants: {
      isExist: true,
      ...payload,
    },
  });

  window.location.replace(redirectAction);
});
