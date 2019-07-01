import { DialogContent } from '@material-ui/core';
import Button from '@material-ui/core/Button/Button';
import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import PeopleIcon from '@material-ui/icons/PeopleRounded';
import { openSnackbar } from '@rebean/snackbar';
import { ValidationErrorDto } from 'Api/api/Validation/ValidationError.dto';
import { ValidationErrorMapper } from 'Api/api/Validation/ValidationError.mapper';
import { DialogIconTitle } from 'App/component/Dialog/DialogIconTitle/DialogIconTitle';
import { FormDialog } from 'App/component/Dialog/FormDialog/FormDialog';
import { ErrorMessage } from 'App/component/ErrorMessage/ErrorMessage';
import { FormError } from 'App/component/FormError/FormError';
import { SubmitButton } from 'App/form/SubmitButton/SubmitButton';
import { AppState } from 'App/store/App.state';
import { DialogAction } from '@codibly/redux-dialog/Dialog.action';
import { DialogSelector } from '@codibly/redux-dialog/Dialog.selector';
import { DomAction } from '@codibly/redux-dom';
import { ThunkDispatch } from 'App/store/Thunk.dispatch';
import { Form, Formik, FormikActions } from 'formik';
import * as React from 'react';
import { ComponentClass, FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { User } from '../../../model/User';
import { UserAction } from '../../../store/User/User.action';
import { UserDetailsSection } from './UserDetailsSection/UserDetailsSection';
import { UserFormDialogData } from './UserFormDialog.data';

export namespace UserFormDialog {
  export type StateProps = {
    initialValues: Partial<UserFormDialogData>;
    user?: User;
  };
  export type DispatchProps = {
    onCancel: () => void;
    onSubmit: (
      data: Partial<UserFormDialogData>,
      actions: FormikActions<Partial<UserFormDialogData>>
    ) => void;
  };
  export type OwnProps = {};
  export type Props = OwnProps & StateProps & DispatchProps;
}

export const USER_FORM_DIALOG = 'USER_FORM_DIALOG';
export const UserFormDialogPure: FunctionComponent<UserFormDialog.Props> = (props) => (
  <FormDialog name={USER_FORM_DIALOG}>
    <Formik
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validate={UserFormDialogData.validate}
    >
      <>
        <DialogIconTitle label={`${props.user ? 'Edit' : 'New'} user`} icon={PeopleIcon} />
        <DialogContent>
          <Form>
            <FormError component={({ error }) => <ErrorMessage>{error}</ErrorMessage>} />
            <UserDetailsSection />
          </Form>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={props.onCancel}>
            Cancel
          </Button>
          <SubmitButton color="primary">{props.user ? 'Update' : 'Create'}</SubmitButton>
        </DialogActions>
      </>
    </Formik>
  </FormDialog>
);

export const UserFormDialog: ComponentClass<UserFormDialog.OwnProps> = connect(
  (state: AppState): UserFormDialog.StateProps => {
    const user = DialogSelector.getDialogParam(USER_FORM_DIALOG, 'user')(state);

    return {
      user,
      initialValues: UserFormDialogData.initialValues(user)
    };
  },
  (dispatch: ThunkDispatch): UserFormDialog.DispatchProps => ({
    onCancel: () => dispatch(DialogAction.closeDialog()),
    onSubmit: async (data, { setSubmitting, setStatus, setErrors }) => {
      try {
        const user = await dispatch(
          data.id
            ? UserAction.updateUser(UserFormDialogData.toUserUpdateDto(data))
            : UserAction.createUser(UserFormDialogData.toUserCreateDto(data))
        );
        dispatch(DialogAction.closeDialog());
        dispatch(
          openSnackbar(
            data.id
              ? UserFormDialogData.toSnackbarUpdatedMessage(user)
              : UserFormDialogData.toSnackbarCreatedMessage(user)
          )
        );
      } catch (error) {
        dispatch(DomAction.scrollTop());

        if (ValidationErrorDto.isValidationError(error.data)) {
          setErrors(ValidationErrorMapper.toFormErrors(error.data));
        } else {
          dispatch(openSnackbar('Unknown error - please try again'));
          setStatus({ error: 'Unknown error - please try again' });
        }
      } finally {
        setSubmitting(false);
      }
    }
  })
)(UserFormDialogPure);
