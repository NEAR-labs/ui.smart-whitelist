import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CheckVerification from './CheckVerification/CheckVerification';
import Onfido from './Onfido/Onfido';

const VerifyAccount = ({ history }) => {
  const state = useStoreState((state) => state);
  const sessionStatus = state.main.session.status;
  const isRegistered = sessionStatus === 'registered' || sessionStatus === 'registered_token';
  const actions = useStoreActions((actions) => actions.main);
  const onGenerateSDKToken = actions.onGenerateSDKToken;
  const onfidoToken = useStoreState((state) => state.main.onfido.sdk_token);

  useEffect(() => {
    const generateToken = async (history, isRegistered, onGenerateSDKToken, onfidoToken) => {
      if (isRegistered && !onfidoToken) {
        await onGenerateSDKToken(history);
      }
    };
    generateToken(history, isRegistered, onGenerateSDKToken, onfidoToken);
  }, []);

  return (
    <>
      {isRegistered && onfidoToken && <Onfido history={history} sessionStatus={sessionStatus} />}

      {!isRegistered && <CheckVerification history={history} />}
    </>
  );
};

export default VerifyAccount;
