import { initApp } from './onInitApp/initApp';
import { onConnectWallet } from './onConnectWallet';
import { onDisconnect } from './onDisconnect';
import { onVerifyAccount } from './onVerifyAccount';
import { onRegisterSession } from './onRegisterSession';
import { onRegisterContract } from './onRegisterContract';

export const thunks = {
  initApp,
  onConnectWallet,
  onRegisterContract,
  onRegisterSession,
  onVerifyAccount,
  onDisconnect,
};
