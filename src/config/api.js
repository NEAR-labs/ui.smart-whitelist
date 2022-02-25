import ky from 'ky';

const BACKEND = process.env.REACT_APP_BACKEND;
const TIME_OUT = process.env.REACT_APP_REQUEST_TIMEOUT || 10000;

const url = {
  registerSession: `${BACKEND}/register-session`,
};

const registerSession = (account_id, signature) => {
  return ky
    .post(url.registerSession, { json: { account_id, signature }, timeout: parseInt(TIME_OUT) })
    .json();
};

export const api = {
  registerSession: registerSession,
};
