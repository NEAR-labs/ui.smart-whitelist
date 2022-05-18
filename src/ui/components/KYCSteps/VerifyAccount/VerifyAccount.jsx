import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import Onfido from './Onfido/Onfido';

const VerifyAccount = () => {
  const { onGenerateSDKToken } = useStoreActions((actions) => actions.main);
  const onfidoToken = useStoreState((state) => state.main.onfido.sdk_token);

  useEffect(() => {
    if (!onfidoToken) {
      onGenerateSDKToken();
    }
  }, []);

  return <>{onfidoToken && <Onfido />}</>;
};

export default VerifyAccount;
