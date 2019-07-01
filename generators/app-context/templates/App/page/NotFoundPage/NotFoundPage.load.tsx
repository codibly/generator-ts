import { Loadable } from 'App/component/Loadable/Loadable';
import * as React from 'react';
import { NotFoundPage as NotFoundPageType } from './NotFoundPage';

export const NotFoundPageLoadable = Loadable<NotFoundPageType.Props>({
  loader: () => import('./NotFoundPage' /* webpackChunkName: "NotFoundPage" */),
  render: ({ NotFoundPage }, props) => <NotFoundPage {...props} />
});
