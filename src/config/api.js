import ky from 'ky';
import { getKeyPair } from '../store/main/helpers/getKeyPair';
import { getSignature } from '../store/main/helpers/getSignature';
import { useStoreState } from 'easy-peasy';

const BACKEND = process.env.REACT_APP_BACKEND;
const TIME_OUT = process.env.REACT_APP_REQUEST_TIMEOUT || 10000;

const url = {
  registerSession: `${BACKEND}/register-session`,
  registerApplicant: `${BACKEND}/register-applicant`,
  generateSDKToken: `${BACKEND}/generate-sdk-token`,
  createCheck: `${BACKEND}/create-check`,
  loadCountries: `${BACKEND}/supported-applicant-countries`,
};

const headers = {
  'content-type': 'application/json',
};

const UseSignature = async (state) => {
  const session_token = state.main.session.session_token;
  const keyPair = await getKeyPair(state);
  const signature = await getSignature(keyPair, session_token);
  return signature;
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
  const { first_name, last_name, dob, email, address } = data;
  return ky
    .post(url.registerApplicant, {
      json: { first_name, last_name, dob, email, account_id, address, signature },
      timeout: parseInt(TIME_OUT),
    })
    .json();
};

const generateSDKToken = async (state, account_id) => {
  const signature = await UseSignature(state);
  return ky
    .post(url.generateSDKToken, {
      json: { account_id, signature },
      timeout: parseInt(TIME_OUT),
    })
    .json();
};

const getCountries = async () => {
  return ky.get(url.loadCountries).json();
};

const createCheck = async (account_id, signature) => {
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
  getCountries: getCountries,
};
