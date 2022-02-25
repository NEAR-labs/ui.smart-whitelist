import { routes } from '../../../config/routes';

const { createApplicant } = routes;

export const getSessionStatus = {
  new: createApplicant,
  registered: null,
  registered_token: null,
  verification_in_progress: null,
  applicant_was_rejected: null,
  account_is_whitelisted: null,
};
