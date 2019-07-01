import * as React from 'react';
import { ComponentClass, FunctionComponent } from 'react';
import ErrorBoundary from 'react-error-boundary';
import { connect } from 'react-redux';
import { ErrorPageLoadable } from '../../../page/ErrorPage/ErrorPage.load';
import { getLocationPath } from '@codibly/router-selector/routerSelector';

export namespace PageErrorBoundary {
  export type StateProps = {
    path?: string;
  };
  export type DispatchProps = {};
  export type OwnProps = {};
  export type Props = StateProps & DispatchProps & OwnProps;
}

const PageErrorBoundaryPure: FunctionComponent<PageErrorBoundary.Props> = ({ path, children }) => (
  <ErrorBoundary FallbackComponent={ErrorPageLoadable} key={path}>
    {children}
  </ErrorBoundary>
);

export const PageErrorBoundary: ComponentClass<PageErrorBoundary.OwnProps> = connect(
  (state): PageErrorBoundary.StateProps => ({
    path: getLocationPath(state)
  })
)(PageErrorBoundaryPure);
