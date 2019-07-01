import { DialogContent } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { openSnackbar } from '@rebean/snackbar';
import { DialogIconTitle } from 'App/component/Dialog/DialogIconTitle/DialogIconTitle';
import { SubmitButton } from 'App/form/SubmitButton/SubmitButton';
import { AppState } from 'App/store/App.state';
import { DialogAction } from '@codibly/redux-dialog/Dialog.action';
import { DomAction } from '@codibly/redux-dom';
import { ThunkDispatch } from 'App/store/Thunk.dispatch';
import { Formik, FormikActions } from 'formik';
import { FORBIDDEN } from 'http-status-codes';
import * as React from 'react';
import { ComponentClass, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { FormDialogCell } from 'App/component/Dialog/FormDialog/FormDialog.style';
import { ErrorMessage } from 'App/component/ErrorMessage/ErrorMessage';
import { FormError } from 'App/component/FormError/FormError';
import { TextField } from 'App/form/TextField/TextField';
import { AuthAction } from 'Auth/store/Auth/Auth.action';
import { ChangePasswordFormData } from './ChangePasswordForm.data';
import { FormContainer } from './ChangePasswordForm.style';

export namespace ChangePasswordForm {
  export type StateProps = {
    initialValues: ChangePasswordFormData;
  };
  export type DispatchProps = {
    onCancel: () => void;
    onSubmit: (
      data: ChangePasswordFormData,
      actions: FormikActions<Partial<ChangePasswordFormData>>
    ) => void;
  };
  export type OwnProps = {};
  export type Props = OwnProps & StateProps & DispatchProps;
}

export const ChangePasswordFormPure: FunctionComponent<ChangePasswordForm.Props> = (props) => (
  <Formik
    initialValues={props.initialValues}
    onSubmit={props.onSubmit}
    validate={ChangePasswordFormData.validate}
  >
    <>
      <DialogIconTitle label="Change password" icon={AccountIcon} />
      <DialogContent>
        <FormContainer>
          <FormError component={({ error }) => <ErrorMessage>{error}</ErrorMessage>} />
          <FormDialogCell>
            <TextField name="current" label="Current password" autoComplete="off" type="password" />
          </FormDialogCell>
          <FormDialogCell>
            <TextField name="new" label="New password" autoComplete="off" type="password" />
          </FormDialogCell>
          <FormDialogCell>
            <TextField
              name="confirmed"
              label="Confirm password"
              autoComplete="off"
              type="password"
            />
          </FormDialogCell>
        </FormContainer>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={props.onCancel}>
          Cancel
        </Button>
        <SubmitButton color="primary">Change</SubmitButton>
      </DialogActions>
    </>
  </Formik>
);

export const ChangePasswordForm: ComponentClass<ChangePasswordForm.OwnProps> = connect(
  (state: AppState): ChangePasswordForm.StateProps => ({
    initialValues: ChangePasswordFormData.initialValues()
  }),
  (dispatch: ThunkDispatch): ChangePasswordForm.DispatchProps => ({
    onCancel: () => dispatch(DialogAction.closeDialog()),
    onSubmit: async (data, { setSubmitting, setStatus }) => {
      try {
        await dispatch(
          AuthAction.changePassword(ChangePasswordFormData.toAuthChangePasswordDto(data))
        );
        dispatch(DialogAction.closeDialog());
        dispatch(openSnackbar('Password has been changed'));
      } catch (error) {
        dispatch(DomAction.scrollTop());
        if (error && error.status === FORBIDDEN) {
          setStatus({ error: 'Provided current password does not match' });
        } else {
          setStatus({ error: 'Unknown error - please try again' });
        }
      } finally {
        setSubmitting(false);
      }
    }
  })
)(ChangePasswordFormPure);
