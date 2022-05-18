import React, { StrictMode } from 'react';
import { StoreProvider } from 'easy-peasy';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import './index.css';
import App from './ui/App';
import { store } from './store';
import { Initializer } from './ui/providers/Initializer/Initializer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from '@mui/material';

const history = createBrowserHistory();

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536, // large screens
    },
  },
  palette: {
    primary: {
      main: colors.deepPurple[500],
    },
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          paddingRight: 0,
          '@media screen  and (max-width: 600px)': {
            minHeight: '56px',
            paddingLeft: 0,
            paddingRight: 0,
          },
          '@media screen  and (min-width: 601px)': {
            minHeight: '72px',
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },
  },
});

render(
  <StrictMode>
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Initializer history={history} store={store}>
          <Router>
            <App history={history} />
          </Router>
        </Initializer>
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>,
  document.getElementById('root'),
);
