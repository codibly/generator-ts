import { FormDialog } from '@codibly/material-ui';
import { FunctionComponent } from 'react';
import * as React from 'react';
import { ChangePasswordForm } from '../ChangePasswordForm/ChangePasswordForm';

export namespace ChangePasswordDialog {
  export type Props = {};
}

export const CHANGE_PASSWORD_DIALOG = 'CHANGE_PASSWORD_DIALOG';
export const ChangePasswordDialog: FunctionComponent<ChangePasswordDialog.Props> = (props) => (
  <FormDialog name={CHANGE_PASSWORD_DIALOG}>
    <ChangePasswordForm />
  </FormDialog>
);
