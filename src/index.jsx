import { StrictMode } from 'react';
import { StoreProvider } from 'easy-peasy';
import { createBrowserHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import './index.css';
import App from './ui/components/App';
import { store } from './store';
import { Initializer } from './ui/providers/Initializer/Initializer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from '@mui/material';

const history = createBrowserHistory();
const theme = createTheme({
  palette: {
    primary: {
      main: colors.deepPurple[500],
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
