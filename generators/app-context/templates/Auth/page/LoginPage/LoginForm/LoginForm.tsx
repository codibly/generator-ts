import { CheckboxField } from '@codibly/formik-material-ui/CheckboxField/CheckboxField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import { ErrorMessage } from 'App/component/ErrorMessage/ErrorMessage';
import { FormError } from 'App/component/FormError/FormError';
import { Formik, FormikActions } from 'formik';
import { TextField } from 'formik-material-ui';
import { ComponentClass, FunctionComponent } from 'react';
import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from '../../../../App/store/Thunk.dispatch';
import { AuthAction } from '../../../store/Auth/Auth.action';
import { LoginFormData } from './LoginForm.data';
import {
  ErrorContainer,
  FieldsContainer,
  FormContainer,
  LoginButton,
  LoginButtonContainer,
  LoginField,
  RememberMeContainer
} from './LoginForm.style';

export namespace LoginForm {
  export type StateProps = {
    initialValues: Partial<LoginFormData>;
  };
  export type DispatchProps = {
    onSubmit: (
      data: Partial<LoginFormData>,
      actions: FormikActions<Partial<LoginFormData>>
    ) => void;
  };
  export type OwnProps = {};
  export type Props = OwnProps & StateProps & DispatchProps;
}

export const LoginFormDumb: FunctionComponent<LoginForm.Props> = (props) => (
  <Formik
    initialValues={props.initialValues}
    onSubmit={props.onSubmit}
    validate={LoginFormData.validate}
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
        <LoginField
          name="password"
          type="password"
          label="Password"
          helperText=""
          component={TextField}
          variant="outlined"
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            )
          }}
        />
        <RememberMeContainer>
          <FormControlLabel
            control={<CheckboxField name="remember" color="primary" />}
            label="Remember me"
          />
        </RememberMeContainer>
      </FieldsContainer>
      <LoginButtonContainer>
        <LoginButton variant="contained" color="primary" size="large" fullWidth>
          Login
        </LoginButton>
      </LoginButtonContainer>
    </FormContainer>
  </Formik>
);

export const LoginForm: ComponentClass<LoginForm.OwnProps> = connect(
  (): LoginForm.StateProps => ({
    initialValues: LoginFormData.initialValues
  }),
  (dispatch: ThunkDispatch): LoginForm.DispatchProps => ({
    onSubmit: async (data, { setSubmitting, setStatus }) => {
      try {
        await dispatch(AuthAction.login(data.email!, data.password!, !!data.remember));
        setSubmitting(false);
      } catch (error) {
        setStatus({ error: LoginFormData.getErrorMessage(error) });
      } finally {
        setSubmitting(false);
      }
    }
  })
)(LoginFormDumb);
