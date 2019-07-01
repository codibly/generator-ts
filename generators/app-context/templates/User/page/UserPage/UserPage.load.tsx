import { Loadable } from 'App/component/Loadable/Loadable';
import * as React from 'react';
import { UserPage as UserPageType } from './UserPage';

export const UserPageLoadable = Loadable<UserPageType.Props>({
  loader: () => import('./UserPage' /* webpackChunkName: "UserPage" */),
  render: ({ UserPage }, props) => <UserPage {...props} />
});
