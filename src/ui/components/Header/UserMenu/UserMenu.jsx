import { Button, Menu } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useState } from 'react';
import { useStyles } from './UserMenu.styles';
import Box from '@mui/material/Box';
import NearLogo from '../../images/near_logo.jpg';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import HelpIcon from '@mui/icons-material/Help';
import ListItemText from '@mui/material/ListItemText';
import { useStoreActions } from 'easy-peasy';

const UserMenu = ({ history, accountId }) => {
  const onDisconnect = useStoreActions((actions) => actions.main.onDisconnect);

  const handleDisconnectWallet = () => {
    onDisconnect(history);
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="menu-button"
        aria-controls={isOpen ? 'menu-button' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? 'true' : undefined}
        variant="contained"
        disableElevation
        color="inherit"
        className={classes.button}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
      >
        <span className={classes.textWrapper}>
          {accountId} {accountId} {accountId}
        </span>
      </Button>
      <Menu
        className={classes.menu}
        id="user-menu"
        elevation={0}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        color="inherit"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ p: 2 }}
        >
          <Box
            component="img"
            src={NearLogo}
            alt={'Near'}
            sx={{ width: '72px', height: '72px', mb: 2 }}
          />
          <Typography component="h5" sx={{ fontWeight: [700] }}>
            {accountId}
          </Typography>
        </Box>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <HelpIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Support</ListItemText>
        </MenuItem>
        <Divider />
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ p: 2 }}>
          <Button
            onClick={handleDisconnectWallet}
            variant="outlined"
            sx={{
              fontWeight: [600],
              borderRadius: 3,
              width: 1,
              backgroundColor: '#F2E7FE',
              border: 0,
            }}
          >
            Disconnect
          </Button>
        </Box>
      </Menu>
    </>
  );
};

export default UserMenu;
