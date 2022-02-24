import { isAccountExist } from '../../helpers/isAccountExist';

export const checkUserAccounts = async (state, actions, history) => {
  const wallet = state.main.entities.wallet;
  const accountId = wallet.getAccountId();
  const isSignIn = wallet.isSignedIn();

  const isWalletAccount = await isAccountExist(state, accountId);

  if (!isSignIn && !isWalletAccount) {
    actions.onDisconnect(history);
  }
};
