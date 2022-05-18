import React from 'react';
import FaceId from '../../ui/components/images/face_id.jpg';
import { Box, Button, Typography } from '@mui/material';
import { useStoreActions } from 'easy-peasy';
import Header from '../../ui/components/Header/Header';
import { useStyles } from './WelcomePage.styles';

const WelcomePage = ({ history }) => {
  const onConnectWallet = useStoreActions((actions) => actions.main.onConnectWallet);
  const classes = useStyles();

  const handleConnectWallet = () => {
    onConnectWallet();
  };

  return (
    <>
      <Header />
      <Box component="main">
        <Box className={classes.container}>
          <Box display="flex" justifyContent="center" className={classes.content}>
            <Box className={classes.textBlock}>
              <Box className={classes.title}>
                <Box component="h3" sx={{ fontWeight: [700], fontSize: 48 }}>
                  Submit DAO
                </Box>
                <Box component="h3" sx={{ fontWeight: [700], fontSize: 48, mb: 2 }}>
                  proposal to get paid
                </Box>
              </Box>
              <Box
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                className={classes.description}
              >
                <Typography variant="body2">
                  Guide on next steps of how to create a payout proposal:
                </Typography>
                <Typography variant="body" display="flex">
                  <Box
                    component="ul"
                    sx={{
                      pl: 2,
                      listStyleType: 'none',
                      letterSpacing: 0.15,
                      fontSize: '1rem',
                      lineHeight: '24px',
                    }}
                  >
                    <li>1. Connect Wallet / Setup NEAR account;</li>
                    <li>2. Verify your account; </li>
                    <li>3. Submit your proposal.</li>
                  </Box>
                </Typography>
              </Box>
              <Box display="flex" sx={{ paddingRight: 2, paddingLeft: 2 }}>
                <Button
                  sx={{
                    borderRadius: 3,
                  }}
                  color="primary"
                  variant="contained"
                  onClick={handleConnectWallet}
                  disableElevation
                >
                  Get started
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className={classes.imageBox}>
            <img src={FaceId} alt="Face id" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default WelcomePage;
