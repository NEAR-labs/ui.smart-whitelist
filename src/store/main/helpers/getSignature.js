import { getKeyPair } from './getKeyPair';

export const getSignature = async (state) => {
  const wallet = state.main.entities.wallet;
  const accountId = wallet.getAccountId();
  const keyPair = await getKeyPair(state);
  const msg = Buffer.from(accountId);
  return keyPair.sign(msg);
};
