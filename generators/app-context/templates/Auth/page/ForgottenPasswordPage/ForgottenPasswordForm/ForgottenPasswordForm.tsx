import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { openSnackbar } from '@rebean/snackbar';
import { ErrorMessage } from 'App/component/ErrorMessage/ErrorMessage';
import { FormError } from 'App/component/FormError/FormError';
import { Formik, FormikActions } from 'formik';
import { TextField } from 'formik-material-ui';
import { UNAUTHORIZED } from 'http-status-codes';
import * as React from 'react';
import { ComponentClass, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { AuthRoute } from 'App/route/auth';
import { ThunkDispatch } from 'App/store/Thunk.dispatch';
import { AuthAction } from '../../../store/Auth/Auth.action';
import { ForgottenPasswordFormData } from './ForgottenPasswordForm.data';
import {
  ButtonContainer,
  ErrorContainer,
  FormContainer,
  LoginField,
  RedirectLink,
  SendLinkButton
} from './ForgottenPasswordForm.style';

export namespace ForgottenPasswordForm {
  export type StateProps = {
    initialValues: Partial<ForgottenPasswordFormData>;
  };
  export type DispatchProps = {
    onSubmit: (
      data: Partial<ForgottenPasswordFormData>,
      actions: FormikActions<Partial<ForgottenPasswordFormData>>
    ) => void;
  };
  export type OwnProps = {};
  export type Props = OwnProps & StateProps & DispatchProps;
}

export const ForgottenPasswordFormDumb: FunctionComponent<ForgottenPasswordForm.Props> = (
  props
) => (
  <Formik
    initialValues={props.initialValues}
    onSubmit={props.onSubmit}
    validate={ForgottenPasswordFormData.validate}
  >
    <FormContainer>
      <FormError
        component={({ error }) => (
          <ErrorContainer>
            <ErrorMessage>{error}</ErrorMessage>
          </ErrorContainer>
        )}
      />
      <LoginField
        name="email"
        label="Email"
        component={TextField}
        variant="outlined"
        margin="dense"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          )
        }}
      />
      <ButtonContainer>
        <SendLinkButton type="submit" variant="contained" color="primary" size="large" fullWidth>
          Send link
        </SendLinkButton>
      </ButtonContainer>
      <Typography variant="caption" align="center">
        <RedirectLink to={AuthRoute.LOGIN}>Login page</RedirectLink>
      </Typography>
    </FormContainer>
  </Formik>
);

export const ForgottenPasswordForm: ComponentClass<ForgottenPasswordForm.OwnProps> = connect(
  (state): ForgottenPasswordForm.StateProps => ({
    initialValues: ForgottenPasswordFormData.initialValues()
  }),
  (dispatch: ThunkDispatch): ForgottenPasswordForm.DispatchProps => ({
    onSubmit: async (data, { setSubmitting, setStatus }) => {
      try {
        await dispatch(AuthAction.resetPasswordRequest({ email: data.email! }));
        setSubmitting(false);
        dispatch(openSnackbar('Email was sent. Please check your email'));
      } catch (error) {
        if (error && error.status === UNAUTHORIZED) {
          setStatus({ error: 'Invalid email' });
        } else {
          setStatus({ error: 'Unknown error - please try again' });
        }
      } finally {
        setSubmitting(false);
      }
    }
  })
)(ForgottenPasswordFormDumb);
