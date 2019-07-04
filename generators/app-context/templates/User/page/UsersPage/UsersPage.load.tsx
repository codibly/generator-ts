import { Loadable } from 'App/component/Loadable/Loadable';
import * as React from 'react';
import { UsersPage as UsersPageType } from './UsersPage';

export const UsersPageLoadable = Loadable<UsersPageType.Props>({
  loader: () => import('./UsersPage' /* webpackChunkName: "UsersPage" */),
  render: ({ UsersPage }, props) => <UsersPage {...props} />
});
