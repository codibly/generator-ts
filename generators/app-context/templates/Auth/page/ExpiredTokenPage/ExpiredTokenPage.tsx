import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { AppState } from 'App/store/App.state';
import { push } from 'connected-react-router';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AuthRoute } from 'App/route/auth';
import {
  ButtonContainer,
  CardContainer,
  ExpiredTokenCard,
  ExpiredTokenText,
  RecoveryPasswordButton
} from './ExpiredTokenPage.style';

export namespace ExpiredTokenPage {
  export type StateProps = {};
  export type DispatchProps = {
    onRecoverPassword: () => void;
  };
  export type OwnProps = {};
  export type Props = StateProps & DispatchProps & OwnProps;
}

export const ExpiredTokenPageDumb: FunctionComponent<ExpiredTokenPage.Props> = ({
  onRecoverPassword
}) => (
  <CardContainer>
    <ExpiredTokenCard>
      <CardContent>
        <ExpiredTokenText variant="subtitle2" align="center">
          Your request to reset password has been expired, please try again.
        </ExpiredTokenText>
        <ButtonContainer>
          <RecoveryPasswordButton
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            onClick={onRecoverPassword}
          >
            Reset password page
          </RecoveryPasswordButton>
        </ButtonContainer>
      </CardContent>
      <Typography variant="caption" align="center">
        If any questions, please contact <br />
      </Typography>
    </ExpiredTokenCard>
  </CardContainer>
);

export const ExpiredTokenPage = connect(
  (state: AppState): ExpiredTokenPage.StateProps => ({}),
  (dispatch): ExpiredTokenPage.DispatchProps => ({
    onRecoverPassword: () => dispatch(push(AuthRoute.FORGOTTEN_PASSWORD))
  })
)(ExpiredTokenPageDumb);
