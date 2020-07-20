import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';

import configureStore, { history } from './store';
import Routes from './routes';

const store = configureStore();

function App () {
  return (
    <>
      <Provider store={store}>
        <ConfirmProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <ConnectedRouter history={history}>
              <Routes />
            </ConnectedRouter>
          </SnackbarProvider>
        </ConfirmProvider>
      </Provider>
    </>
  );
}

export default App;
