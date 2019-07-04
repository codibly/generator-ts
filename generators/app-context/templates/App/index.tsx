import * as LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { isProduction } from './environment';

if (isProduction()) {
  LogRocket.init('APP_ID');
  setupLogRocketReact(LogRocket);
}

import { AppRouter } from 'App/router/App.router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createContext } from './createContext';
import { createStore } from './createStore';

const history = createBrowserHistory();
const store = createStore(history);
const context = createContext(store, history);

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');

  if (root) {
    if (module.hot) {
      module.hot.accept(['./createContext', './router/App.router'], async () => {
        const { createContext: nextCreateContext } = await import('./createContext');
        const { AppRouter: NextAppRouter } = await import('./router/App.router');
        const nextContext = nextCreateContext(store, history);

        ReactDOM.render(nextContext(NextAppRouter), root);
      });
    }

    ReactDOM.render(context(AppRouter), root);

  } else {
    // tslint:disable-next-line:no-console
    throw new Error('Cannot mount React application - there is no #root element in document body.');
  }
});
