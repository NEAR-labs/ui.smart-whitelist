import { routes } from '../../../config/routes';

const { createApplicant, generateSDKToken, verifyAccount } = routes;

export const getSessionStatus = {
  new: createApplicant,
  registered: generateSDKToken,
  registered_token: generateSDKToken,
  verification_in_progress: null,
  applicant_was_rejected: null,
  account_is_whitelisted: null,
};
