import { AppBar, Toolbar, Box, Typography, Menu, Button, MenuItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useStoreState } from 'easy-peasy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { alpha } from '@mui/material/styles';

const Header = () => {
  const wallet = useStoreState((state) => state.main.entities.wallet);
  const accountId = wallet.getAccountId();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const useStyles = makeStyles((theme) => ({
    header: {
      backgroundColor: '#fff !important',
      color: '#000 !important',
    },
    account: {
      fontWeight: '700 !important',
      textAlign: 'left',
    },
    button: {
      fontSize: '10px !important',
      backgroundColor: '#ccc',
      borderRadius: '16px !important',
    },
    menu: {
      '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
          'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
          padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1.5),
          },
          '&:active': {
            backgroundColor: alpha(
              theme.palette.primary.main,
              theme.palette.action.selectedOpacity,
            ),
          },
        },
      },
    },
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <>
      {accountId && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={0} className={classes.header}>
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                className={classes.account}
              >
                {accountId}
              </Typography>
              <Button
                id="demo-customized-button"
                aria-controls={isOpen ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isOpen ? 'true' : undefined}
                variant="contained"
                disableElevation
                color="inherit"
                className={classes.button}
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClick}
              >
                {accountId}
              </Button>
              <Menu
                className={classes.menu}
                id="demo-customized-menu"
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
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                color="inherit"
              ></Menu>
            </Toolbar>
          </AppBar>
        </Box>
      )}{' '}
    </>
  );
};

export default Header;
