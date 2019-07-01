import { AppState } from 'App/store/App.state';
import * as React from 'react';
import { ComponentType, FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Route, RouteProps } from 'react-router';
import { AuthStatus } from '../../model/AuthStatus';
import { AuthSelector } from '../../store/Auth/Auth.selector';

export namespace ProtectedRoute {
  export type StateProps = {
    status: AuthStatus;
  };
  export type DispatchProps = {};
  export type OwnProps = RouteProps & {
    unknown?: ReactElement<any> | null;
    notAuthenticated?: ReactElement<any> | null;
  };
  export type Props = StateProps & DispatchProps & OwnProps;
}

export const ProtectedRouteDumb: FunctionComponent<ProtectedRoute.Props> = ({
  component: Component,
  render,
  children,
  status,
  unknown,
  notAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      switch (status) {
        case AuthStatus.AUTHENTICATED:
          if (Component) {
            return React.createElement(Component, props);
          } else if (render) {
            return render(props);
          } else if (children) {
            return children;
          }

          return null;

        case AuthStatus.NOT_AUTHENTICATED:
          return notAuthenticated || null;

        case AuthStatus.UNKNOWN:
        default:
          return unknown || null;
      }
    }}
  />
);

export const ProtectedRoute: ComponentType<ProtectedRoute.OwnProps> = connect(
  (state: AppState): ProtectedRoute.StateProps => ({
    status: AuthSelector.getStatus(state)
  })
)(ProtectedRouteDumb);

ProtectedRoute.defaultProps = {
  unknown: null,
  notAuthenticated: null
};
