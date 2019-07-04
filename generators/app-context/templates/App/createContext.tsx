import { IntlProvider } from '@codibly/react-intl-hook';
import LuxonUtils from '@date-io/luxon';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { theme } from 'App/theme';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'emotion-theming';
import { History } from 'history';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { ComponentType, ReactElement } from 'react';
import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Store } from 'redux';
import { SnackbarPortal } from './component/SnackbarPortal/SnackbarPortal';

export function createContext(store: Store<any>, history: History) {
  return (Component: ComponentType<any>): ReactElement<any> => (
    <StoreProvider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
              <IntlProvider locale="en-US">
                <CssBaseline />
                <SnackbarPortal />
                <Component />
              </IntlProvider>
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </ConnectedRouter>
    </StoreProvider>
  );
}
