import { Contract } from 'near-api-js';

export const getUserContract = (wallet, contractId) =>
  new Contract(wallet.account(), contractId, {
    viewMethods: ['get_applicant_pk', 'is_whitelisted'],
    changeMethods: ['register_applicant', 'remove_applicant'],
    signer: wallet.account(),
  });
