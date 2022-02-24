import { initApp } from './onInitApp/initApp';
import { onConnectWallet } from './onConnectWallet';
import { onDisconnect } from './onDisconnect';
import { onVerifyAccount } from './onVerifyAccount';
import { onRegisterSession } from './onRegisterSession';
import { onRegisterApplicant } from './onRegisterApplicant';

export const thunks = {
  initApp,
  onConnectWallet,
  onRegisterApplicant,
  onRegisterSession,
  onVerifyAccount,
  onDisconnect,
};
