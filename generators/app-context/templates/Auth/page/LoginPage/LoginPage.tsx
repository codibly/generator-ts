import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AppState } from 'App/store/App.state';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AuthRoute } from 'App/route/auth';
import { AuthStatus } from '../../model/AuthStatus';
import { AuthSelector } from '../../store/Auth/Auth.selector';
import { RedirectLink } from '../ForgottenPasswordPage/ForgottenPasswordForm/ForgottenPasswordForm.style';
import { LoginForm } from './LoginForm/LoginForm';
import {
  LoginCard,
  LoginCardContainer
} from './LoginPage.style';

export namespace LoginPage {
  export type StateProps = {
    status: AuthStatus;
  };
  export type OwnProps = {};
  export type DispatchProps = {};
  export type Props = StateProps & OwnProps & DispatchProps;
}

export const LoginPageDumb: FunctionComponent<LoginPage.Props> = ({ status }) => (
  <LoginCardContainer>
    <LoginCard>
      <CardContent>

        <LoginForm />

        <Typography variant="caption" align="center">
          <RedirectLink to={AuthRoute.FORGOTTEN_PASSWORD}>Forgot password?</RedirectLink>
        </Typography>
      </CardContent>
    </LoginCard>
  </LoginCardContainer>
);

export const LoginPage = connect(
  (state: AppState): LoginPage.StateProps => ({
    status: AuthSelector.getStatus(state)
  })
)(LoginPageDumb);
