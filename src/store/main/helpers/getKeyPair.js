import { nearConfig } from '../../../config/nearConfig';

const { networkId } = nearConfig;
export const getKeyPair = async (state) => {
  const wallet = state.main.entities.wallet;
  const accountId = wallet.getAccountId();
  const keyStore = wallet._keyStore;

  return keyStore.getKey(networkId, accountId);
};
