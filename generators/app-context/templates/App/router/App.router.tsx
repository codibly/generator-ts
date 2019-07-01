import * as React from 'react';
import { FC } from 'react';
import { Route, Switch } from 'react-router';
import { PageErrorBoundary } from 'App/component/PageErrorBoundary/PageErrorBoundary';
import { NotFoundPageLoadable } from 'App/page/NotFoundPage/NotFoundPage.load';
import { AuthRoute } from 'App/route/auth';
import { LoginPageLoadable } from 'Auth/page/LoginPage/LoginPage.load';
import { ExpiredTokenPage } from 'Auth/page/ExpiredTokenPage/ExpiredTokenPage';
import { ForgottenPasswordPage } from 'Auth/page/ForgottenPasswordPage/ForgottenPasswordPage';
import { ResetPasswordPage } from 'Auth/page/ResetPasswordPage/ResetPasswordPage';
import {UsersPageLoadable} from "../../User/page/UsersPage/UsersPage.load";
import { ProtectedRoute } from 'Auth/component/ProtectedRoute/ProtectedRoute';

export namespace AppRouter {
  export type Props = {};
}

export const AppRouter: FC<AppRouter.Props> = () => (
  <PageErrorBoundary>
    <Switch>
      <Route path={AuthRoute.LOGIN} component={LoginPageLoadable} exact />
      <Route path={AuthRoute.FORGOTTEN_PASSWORD} component={ForgottenPasswordPage} exact />
      <Route path={AuthRoute.RESET_PASSWORD} component={ResetPasswordPage} exact />
      <Route path={AuthRoute.EXPIRED_TOKEN} component={ExpiredTokenPage} exact />
      {/* <ProtectedRoute path={DashboardRoute.BASE} component={DashboardRouterLoadable} />*/}
      <ProtectedRoute path={'/users'} component={UsersPageLoadable} />
      <Route component={NotFoundPageLoadable} />
    </Switch>
  </PageErrorBoundary>
);
