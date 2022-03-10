import { action } from 'easy-peasy';

export const setApplicant = action((state, payload) => {
  state.onfido.applicant = payload;
});
