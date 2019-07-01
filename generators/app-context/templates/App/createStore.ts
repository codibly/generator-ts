import { asyncActionSanitizer } from '@codibly/redux-async/async.actionSanitizer';
import { asyncMiddleware } from '@codibly/redux-async/async.middleware';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import * as LogRocket from 'logrocket';
import { applyMiddleware, createStore as createReduxStore, StoreEnhancer } from 'redux';
import { createDetectorEnhancer, DetectableStore } from 'redux-detector';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { isProduction } from './environment';
import { appDetector } from './store/app.detector';
import { createAppReducer } from './store/app.reducer';
import { appSaga } from './store/app.saga';

export function createStore(history: History) {
  const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 25,
    actionSanitizer: asyncActionSanitizer({ markStatus: true })
  });
  const detectorEnhancer = createDetectorEnhancer(appDetector);
  const middlewares = [routerMiddleware(history), thunkMiddleware, asyncMiddleware()];
  if (isProduction()) {
    middlewares.push(LogRocket.reduxMiddleware());
  }

  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancer: StoreEnhancer = composeEnhancers(detectorEnhancer, middlewareEnhancer);

  const store = createReduxStore(createAppReducer(history), {}, enhancer) as DetectableStore<any>;

  // add app saga (not as middleware to not mess-up Redux Devtool trace functionality)
  // we can't hot reload saga as we don't expose "unsubscribe" method
  appSaga(store);

  if (module.hot) {
    module.hot.accept('./store/app.saga', async () => {
      // tslint:disable-next-line
      console.warn(`Full reload needed to update src/App/store/app.saga.ts`);
    });
    module.hot.accept('./store/app.reducer', async () => {
      const { createAppReducer: nextCreateRootReducer } = await import('./store/app.reducer');
      store.replaceReducer(nextCreateRootReducer(history));
    });
    module.hot.accept('./store/app.detector', async () => {
      const { appDetector: nextRootDetector } = await import('./store/app.detector');
      store.replaceDetector(nextRootDetector);
    });
  }

  return store;
}
