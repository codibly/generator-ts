import { Loadable } from 'App/component/Loadable/Loadable';
import * as React from 'react';
import { ErrorPage as ErrorPageType } from './ErrorPage';

export const ErrorPageLoadable = Loadable<ErrorPageType.Props>({
  loader: () => import('./ErrorPage' /* webpackChunkName: "ErrorPage" */),
  render: ({ ErrorPage }, props) => <ErrorPage {...props} />
});
