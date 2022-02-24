import { action } from 'easy-peasy';
import { onfido } from '../index';

export const setOnfidoData = action((slice, payload) => {
  console.log(payload);
  slice.applicants = { ...slice.applicants, ...payload.applicants };
});
