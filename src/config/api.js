import ky from 'ky';

const BACKEND = process.env.REACT_APP_BACKEND;
const TIME_OUT = process.env.REACT_APP_REQUEST_TIMEOUT || 10000;

const url = {
  registerSession: `${BACKEND}/register-session`,
  registerApplicant: `${BACKEND}/register-applicant`,
  generateSDKToken: `${BACKEND}/generate-sdk-token`,
  createCheck: `${BACKEND}/create-check`,
};

const headers = {
  'content-type': 'application/json',
};

const registerSession = (account_id, signature) => {
  return ky
    .post(url.registerSession, {
      headers,
      json: { account_id, signature },
      timeout: parseInt(TIME_OUT),
    })
    .json();
};

const registerApplicant = ({ data, account_id, signature }) => {
  const { first_name, last_name, dob, email } = data;
  return ky
    .post(url.registerApplicant, {
      json: { first_name, last_name, dob, email, account_id, signature },
      timeout: parseInt(TIME_OUT),
    })
    .json();
};

const generateSDKToken = (account_id, signature) => {
  return ky
    .post(url.generateSDKToken, {
      json: { account_id, signature },
      timeout: parseInt(TIME_OUT),
    })
    .json();
};

const createCheck = (account_id, signature) => {
  return ky
    .post(url.createCheck, {
      json: { account_id, signature },
      timeout: parseInt(TIME_OUT),
    })
    .json();
};

export const api = {
  registerSession: registerSession,
  registerApplicant: registerApplicant,
  generateSDKToken: generateSDKToken,
  createCheck: createCheck,
};
