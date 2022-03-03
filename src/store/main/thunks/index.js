import { initApp } from './onInitApp/initApp';
import { onConnectWallet } from './onConnectWallet';
import { onDisconnect } from './onDisconnect';
import { onCreateApplicant } from './onCreateApplicant';
import { onRegisterSession } from './onRegisterSession';
import { onRegisterContract } from './onRegisterContract';
import { onGenerateSDKToken } from './onGenerateSDKToken';

export const thunks = {
  initApp,
  onConnectWallet,
  onRegisterContract,
  onRegisterSession,
  onCreateApplicant,
  onGenerateSDKToken,
  onDisconnect,
};
