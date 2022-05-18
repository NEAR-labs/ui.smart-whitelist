import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { useStoreState } from 'easy-peasy';
import Logo from '../images/logo.jpg';
import UserMenu from './UserMenu/UserMenu';

const Header = ({ history }) => {
  const wallet = useStoreState((state) => state.main.entities.wallet);
  const accountId = wallet?.getAccountId() || null;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        paddingRight: '16px',
        paddingLeft: '16px',
        backgroundColor: '#fff',
        color: '#000',
        borderBottom: '1px solid #ccc',
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
        }}
      >
        <Box
          component="img"
          sx={{
            height: 'auto',
          }}
          alt="Near KYC"
          src={Logo}
        />
        {accountId && <UserMenu history={history} accountId={accountId} />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
