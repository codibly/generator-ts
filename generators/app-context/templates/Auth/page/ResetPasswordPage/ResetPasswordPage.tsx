import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AppState } from 'App/store/App.state';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AuthStatus } from '../../model/AuthStatus';
import { AuthSelector } from '../../store/Auth/Auth.selector';
import { ResetPasswordForm } from './ResetPasswordForm/ResetPasswordForm';
import {
  CardContainer,
  ForgottenPasswordCard
} from './ResetPasswordPage.style';

export namespace ResetPasswordPage {
  export type StateProps = {
    status: AuthStatus;
  };
  export type OwnProps = {};
  export type Props = StateProps & OwnProps;
}

export const ResetPasswordPageDumb: FunctionComponent<ResetPasswordPage.Props> = ({ status }) => (
  <CardContainer>
    <ForgottenPasswordCard>
      <CardContent>
        <Typography variant="body2" align="center">
          Enter and confirm password
        </Typography>
        <ResetPasswordForm />
      </CardContent>
    </ForgottenPasswordCard>
  </CardContainer>
);

export const ResetPasswordPage = connect(
  (state: AppState): ResetPasswordPage.StateProps => ({
    status: AuthSelector.getStatus(state)
  })
)(ResetPasswordPageDumb);
