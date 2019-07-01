import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AppState } from 'App/store/App.state';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AuthStatus } from '../../model/AuthStatus';
import { AuthSelector } from '../../store/Auth/Auth.selector';
import { ForgottenPasswordForm } from './ForgottenPasswordForm/ForgottenPasswordForm';
import {
  CardContainer,
  ForgotPasswordText,
  ForgottenPasswordCard
} from './ForgottenPasswordPage.style';

export namespace ForgottenPasswordPage {
  export type StateProps = {
    status: AuthStatus;
  };
  export type OwnProps = {};
  export type Props = StateProps & OwnProps;
}

export const ForgottenPasswordPageDumb: FunctionComponent<ForgottenPasswordPage.Props> = ({
  status
}) => (
  <CardContainer>
    <ForgottenPasswordCard>
      <CardContent>
        <ForgotPasswordText variant="subtitle2" align="center">
          Forgot Password?
        </ForgotPasswordText>
        <Typography variant="body2" align="center">
          Enter your email and we’ll send you link to
          <br />
          reset your password
        </Typography>

        <ForgottenPasswordForm />
      </CardContent>
    </ForgottenPasswordCard>
  </CardContainer>
);

export const ForgottenPasswordPage = connect(
  (state: AppState): ForgottenPasswordPage.StateProps => ({
    status: AuthSelector.getStatus(state)
  })
)(ForgottenPasswordPageDumb);
