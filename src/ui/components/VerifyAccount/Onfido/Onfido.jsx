import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import * as OnfidoSDK from 'onfido-sdk-ui/dist/onfido.min.js';
import 'onfido-sdk-ui/dist/style.css';
import { makeStyles } from '@mui/styles';

const Onfido = ({ history }) => {
  const actions = useStoreActions((actions) => actions.main);
  const onCreateCheck = actions.onCreateCheck;
  const onGenerateSDKToken = actions.onGenerateSDKToken;
  const onfidoToken = useStoreState((state) => state.main.onfido.sdk_token);
  const onfidoContainerId = 'onfido-sdk-wrapper';

  const useStyles = makeStyles((theme) => ({
    onfidoSdk: {
      '& .ods-button.-action--primary': {
        backgroundColor: theme.palette.primary.main,
        textTransform: 'uppercase',
        border: 0,
      },
      '& .onfido-sdk-ui-Modal-inner': {
        border: 0,
      },
      '& .onfido-sdk-ui-Welcome-instructions': {
        textAlign: 'left',
      },
    },
  }));

  useEffect(() => {
    if (onfidoToken)
      OnfidoSDK.init({
        token: onfidoToken,
        containerId: onfidoContainerId,
        onComplete: function (data) {
          onCreateCheck({ history, data });
        },
        onUserExit: function (userExitCode) {
          console.log(userExitCode);
        },
        onError: function (error) {
          if (error.type === 'expired_token') {
            onGenerateSDKToken(history);
          }
        },
        steps: [
          'welcome',
          {
            type: 'document',
            options: {
              documentTypes: {
                /*               driving_licence: {
                                  country: null,
                                },*/
                driving_licence: true,
                passport: true,
                national_identity_card: true,
                residence_permit: true,
                showCountrySelection: false,
              },
            },
          },
          'face',
          'complete',
        ],
      });
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.onfidoSdk}>
      <div id={onfidoContainerId} />
    </div>
  );
};

export default Onfido;
