import ky from 'ky';

const BACKEND = process.env.REACT_APP_BACKEND;
const TIME_OUT = 30000;

const url = {
  registerSession: `${BACKEND}/register-session`,
};

const registerSession = async (account_id, signature) => {
  return ky.post(url.registerSession, { json: { account_id, signature }, timeout: TIME_OUT });
};

export const api = {
  registerSession: registerSession,
};
