import * as React from 'react';
import { FunctionComponent } from 'react';
import { ErrorFallback } from '../../component/ErrorFallback/ErrorFallback';
import { ErrorFallbackContent } from '../../component/ErrorFallback/ErrorFallbackContent/ErrorFallbackContent';
import { ErrorFallbackTitle } from '../../component/ErrorFallback/ErrorFallbackTitle/ErrorFallbackTitle';
import { DashboardRoute } from '../../route/dashboard';
import { StyledLink } from './NotFoundPage.style';

export namespace NotFoundPage {
  export type Props = {};
}

export const NotFoundPage: FunctionComponent<NotFoundPage.Props> = (props) => (
  <ErrorFallback>
    <ErrorFallbackTitle>Unfortunately, this page does not exist.</ErrorFallbackTitle>
    <ErrorFallbackContent>
      Please, check your URL or return to the{' '}
      <StyledLink to={DashboardRoute.HOME}>Home page</StyledLink>
    </ErrorFallbackContent>
  </ErrorFallback>
);
