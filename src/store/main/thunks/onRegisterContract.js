import { thunk } from 'easy-peasy';
import { getUserContract } from '../helpers/getContracts';
import { Buffer } from 'buffer';
import { nearConfig } from '../../../config/nearConfig';
import { getKeyPair } from '../helpers/getKeyPair';

const { contractName } = nearConfig;

export const onRegisterContract = thunk(async (_, history, { getStoreState, getStoreActions }) => {
  const actions = getStoreActions();
  const { enableLoading, disableLoading, setError } = actions.main;
  try {
    global.Buffer = Buffer;
    const state = getStoreState();
    const wallet = state.main.entities.wallet;
    const accountId = wallet?.getAccountId();
    if (accountId) {
      const keyPair = await getKeyPair(state);
      const public_key = keyPair.getPublicKey().toString();
      const contract = getUserContract(wallet, contractName);
      const applicantPk = await contract.get_applicant_pk({
        applicant_account_id: accountId,
      });
      const isWhitelisted = await contract.is_whitelisted({ account_id: accountId });

      if (isWhitelisted) return;

      const isMatch = public_key === applicantPk;
      enableLoading();
      if (!applicantPk) {
        await contract.register_applicant();
      } else {
        if (!isMatch) {
          await contract.remove_applicant();
          await contract.register_applicant();
        }
      }
    }
  } catch (e) {
    setError({
      isError: true,
      description: 'Applicant was not registered',
    });
  } finally {
    disableLoading();
  }
});
