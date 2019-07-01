import { Loadable } from 'App/component/Loadable/Loadable';
import * as React from 'react';
import { LoginPage as LoginPageType } from './LoginPage';

export const LoginPageLoadable = Loadable<LoginPageType.Props>({
  loader: () => import('./LoginPage' /* webpackChunkName: "LoginPage" */),
  render: ({ LoginPage }, props) => <LoginPage {...props} />
});
