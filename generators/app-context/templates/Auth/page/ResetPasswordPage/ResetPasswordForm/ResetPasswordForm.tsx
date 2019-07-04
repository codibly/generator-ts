import InputAdornment from '@material-ui/core/InputAdornment';
import LockIcon from '@material-ui/icons/Lock';
import { openSnackbar } from '@rebean/snackbar';
import { ErrorMessage } from 'App/component/ErrorMessage/ErrorMessage';
import { FormError } from 'App/component/FormError/FormError';
import { required } from '@codibly/validator/required';
import { push } from 'connected-react-router';
import { Formik, FormikActions } from 'formik';
import { UNAUTHORIZED } from 'http-status-codes';
import { ComponentClass, FunctionComponent } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { AuthRoute } from '../../../../App/route/auth';
import { ThunkDispatch } from '../../../../App/store/Thunk.dispatch';
import { AuthAction } from '../../../store/Auth/Auth.action';
import { ResetPasswordFormData } from './ResetPasswordForm.data';
import {
  ButtonContainer,
  ErrorContainer,
  FieldsContainer,
  FormContainer,
  LoginField,
  SendLinkButton
} from './ResetPasswordForm.style';

export namespace ResetPasswordForm {
  export type StateProps = {
    initialValues: Partial<ResetPasswordFormData>;
  };
  export type DispatchProps = {
    onSubmit: (
      data: Partial<ResetPasswordFormData>,
      actions: FormikActions<Partial<ResetPasswordFormData>>
    ) => void;
  };
  export type OwnProps = {};
  export type Props = OwnProps & StateProps & DispatchProps;
}

export const ResetPasswordFormDumb: FunctionComponent<ResetPasswordForm.Props> = (props) => (
  <Formik
    initialValues={props.initialValues}
    onSubmit={props.onSubmit}
    validate={ResetPasswordFormData.validate}
  >
    <FormContainer>
      <FormError
        component={({ error }) => (
          <ErrorContainer>
            <ErrorMessage>{error}</ErrorMessage>
          </ErrorContainer>
        )}
      />
      <FieldsContainer>
        <LoginField
          name="password"
          type="password"
          label="Password"
          validate={required('Please enter a password')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            )
          }}
        />
        <LoginField
          name="confirmedPassword"
          type="password"
          label="Confirm Password"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            )
          }}
        />
      </FieldsContainer>
      <ButtonContainer>
        <SendLinkButton type="submit" variant="contained" color="primary" size="large" fullWidth>
          Save password
        </SendLinkButton>
      </ButtonContainer>
    </FormContainer>
  </Formik>
);

export const ResetPasswordForm: ComponentClass<ResetPasswordForm.OwnProps> = connect(
  (state): ResetPasswordForm.StateProps => ({
    initialValues: ResetPasswordFormData.initialValues()
  }),
  (dispatch: ThunkDispatch): ResetPasswordForm.DispatchProps => ({
    onSubmit: async (data, { setSubmitting, setStatus }) => {
      try {
        await dispatch(AuthAction.resetPassword(ResetPasswordFormData.toResetPasswordDto(data)));
        setSubmitting(false);
        dispatch(openSnackbar('Password was changed. You can now login using new credentials'));
        dispatch(push(AuthRoute.LOGIN));
      } catch (error) {
        if (error && error.status === UNAUTHORIZED) {
          dispatch(push(AuthRoute.EXPIRED_TOKEN));
        } else {
          setStatus({ error: ResetPasswordFormData.getErrorMessage(error) });
        }
      } finally {
        setSubmitting(false);
      }
    }
  })
)(ResetPasswordFormDumb);
