import { asyncMiddleware, asyncActionSanitizer } from '@codibly/redux-async';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import * as LogRocket from 'logrocket';
import { applyMiddleware, createStore as createReduxStore, StoreEnhancer } from 'redux';
import { createDetectorEnhancer, DetectableStore } from 'redux-detector';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { isProduction } from './environment';
import { appDetector } from './store/App.detector';
import { createAppReducer } from './store/App.reducer';

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

  if (module.hot) {
    module.hot.accept('./store/App.reducer', async () => {
      const { createAppReducer: nextCreateRootReducer } = await import('./store/App.reducer');
      store.replaceReducer(nextCreateRootReducer(history));
    });
    module.hot.accept('./store/App.detector', async () => {
      const { appDetector: nextRootDetector } = await import('./store/App.detector');
      store.replaceDetector(nextRootDetector);
    });
  }

  return store;
}
