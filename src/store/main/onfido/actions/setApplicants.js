import { action } from 'easy-peasy';

export const setApplicants = action((slice, payload) => {
  slice.applicants = { ...slice.applicants, ...payload.applicants };
});
