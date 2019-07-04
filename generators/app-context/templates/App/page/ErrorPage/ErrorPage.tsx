import * as React from 'react';
import { FunctionComponent } from 'react';
import { ErrorFallback } from '../../component/ErrorFallback/ErrorFallback';
import { ErrorFallbackAction } from '../../component/ErrorFallback/ErrorFallbackAction/ErrorFallbackAction';
import { ErrorFallbackContent } from '../../component/ErrorFallback/ErrorFallbackContent/ErrorFallbackContent';
import { ErrorFallbackTitle } from '../../component/ErrorFallback/ErrorFallbackTitle/ErrorFallbackTitle';

export namespace ErrorPage {
  export type Props = {};
}

export const ErrorPage: FunctionComponent<ErrorPage.Props> = (props) => (
  <ErrorFallback>
    <ErrorFallbackTitle>Application error</ErrorFallbackTitle>
    <ErrorFallbackContent>
      An error occurred in the application and your page could not be displayed. Please, try to{' '}
      <ErrorFallbackAction onClick={() => window.location.reload()}>
        reload the page
      </ErrorFallbackAction>
    </ErrorFallbackContent>
  </ErrorFallback>
);
