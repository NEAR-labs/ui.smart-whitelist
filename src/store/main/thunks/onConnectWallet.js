import { thunk } from 'easy-peasy';
import { getRoute } from '../../../config/routes';
import { redirectPages } from '../../../config/redirectPages';
import { nearConfig } from '../../../config/nearConfig';
import { Buffer } from 'buffer';

const { contractName } = nearConfig;

export const onConnectWallet = thunk(async (actions, _, helpers) => {
  global.Buffer = Buffer;
  const store = helpers.getStoreState();
  const wallet = store.main.entities.wallet;
  const redirectAction = redirectPages.verifyAccount;

  actions.setTemporaryData({ redirectAction });

  wallet.requestSignIn({
    contractId: contractName,
    successUrl: getRoute.callbackUrl({ redirectAction }),
    failureUrl: getRoute.callbackUrl({ redirectAction, errorCode: 'userReject' }),
  });
});
