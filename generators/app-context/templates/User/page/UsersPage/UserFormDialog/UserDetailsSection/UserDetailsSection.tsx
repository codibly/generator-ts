import {
  FormDialogCell,
  FormDialogRow,
  FormDialogSection,
  FormDialogSubheader
} from 'App/component/Dialog/FormDialog/FormDialog.style';
import { TextField } from 'App/form/TextField/TextField';
import { FunctionComponent } from 'react';
import * as React from 'react';

export namespace UserDetailsSection {
  export type Props = {

  };
}

export const UserDetailsSection: FunctionComponent<UserDetailsSection.Props> = () => (
  <FormDialogSection>
    <FormDialogSubheader variant="subtitle2">User Details</FormDialogSubheader>
    <FormDialogRow>
      <FormDialogCell xs={12} sm={6}>
        <TextField name="firstName" label="First Name" required fullWidth />
      </FormDialogCell>
      <FormDialogCell xs={12} sm={6}>
        <TextField name="lastName" label="Last Name" required />
      </FormDialogCell>
      <FormDialogCell xs={12} sm={6}>
        <TextField name="email" label="Email" autoComplete="off" required />
      </FormDialogCell>
    </FormDialogRow>
  </FormDialogSection>
);
