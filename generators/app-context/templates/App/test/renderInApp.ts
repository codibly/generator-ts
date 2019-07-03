import * as muiQueries from '@codibly/material-ui-testing';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { createMemoryHistory } from 'history';
import { ReactElement } from 'react';
import { applyMiddleware, createStore, Store, StoreEnhancer } from 'redux';
import { createDetectorEnhancer, DetectableStore } from 'redux-detector';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createContext } from '../createContext';
import { appDetector } from '../store/App.detector';
import { createAppReducer } from '../store/App.reducer';

export type RenderInAppResult = RenderResult &
  typeof muiQueries & { store: Store<any>; history: History };

export function renderInApp(
  ui: ReactElement<any>,
  options?: RenderOptions & { withDetectors?: boolean },
  store?: Store<any>,
  history?: History
): RenderInAppResult {
  if (!history) {
    history = createMemoryHistory();
  }

  if (!store) {
    // we don't want to run detectors in tests by default
    const composeEnhancers = composeWithDevTools({});
    const detectorEnhancer = createDetectorEnhancer(appDetector);
    const middlewareEnhancer = applyMiddleware(routerMiddleware(history), thunkMiddleware);

    // We want to migrate tests to use detectors as well. To do it iteratively we can use withDetectors flag.
    const enhancer: StoreEnhancer =
      options && options.withDetectors
        ? composeEnhancers(detectorEnhancer, middlewareEnhancer)
        : middlewareEnhancer;

    store = createStore(createAppReducer(history), {}, enhancer) as DetectableStore<any>;
  }

  const context = createContext(store, history);

  return {
    ...render(context(() => ui), options),
    ...muiQueries,
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store: store,
    history
  };
}
