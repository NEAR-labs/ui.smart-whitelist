import { onInitApp } from './onInitApp';
import { onConnectWallet } from './onConnectWallet';
import { onDisconnect } from './onDisconnect';
import { onCreateApplicant } from './onCreateApplicant';
import { onRegisterSession } from './onRegisterSession';
import { onRegisterContract } from './onRegisterContract';
import { onGenerateSDKToken } from './onGenerateSDKToken';
import { onCreateCheck } from './onCreateCheck';

export const thunks = {
  onInitApp,
  onConnectWallet,
  onRegisterContract,
  onRegisterSession,
  onCreateApplicant,
  onGenerateSDKToken,
  onCreateCheck,
  onDisconnect,
};
