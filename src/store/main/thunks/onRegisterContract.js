import { thunk } from 'easy-peasy';
import { getUserContract } from '../helpers/getContracts';
import { Buffer } from 'buffer';
import { nearConfig } from '../../../config/nearConfig';
import { getKeyPair } from '../helpers/getKeyPair';
import { registerContract } from './onInitApp/contract/registerContract';
import { removeContract } from './onInitApp/contract/removeContract';

const { contractName, networkId } = nearConfig;

export const onRegisterContract = thunk(async (_, history, { getStoreState, getStoreActions }) => {
  global.Buffer = Buffer;
  const state = getStoreState();
  const actions = getStoreActions();

  try {
    const wallet = state.main.entities.wallet;
    const accountId = wallet.getAccountId();
    const keyPair = await getKeyPair(state);
    const public_key = keyPair.getPublicKey().toString();
    const contract = getUserContract(wallet, contractName);
    const applicantPk = await contract.get_applicant_pk({
      applicant_account_id: accountId,
    });

    const isMatch = public_key === applicantPk;

    if (!applicantPk) {
      await registerContract({ state, actions, history, contract });
    } else {
      if (!isMatch) {
        await removeContract({ state, actions, history, contract });
      }
    }
  } catch (e) {
    actions.main.setError({ description: e.message });
  }
});
