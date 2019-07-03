import MenuItem from '@material-ui/core/MenuItem';
import { DefaultTextField } from '@codibly/material-ui';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { Role } from '../../model/Role';

export namespace RoleSelectField {
  export type Props = DefaultTextField.Props & {
    roles: Role[];
  };
}

export const RoleSelectField: FunctionComponent<RoleSelectField.Props> = ({ roles, ...props }) => (
  <DefaultTextField {...props} select>
    {roles.map((role) => (
      <MenuItem key={role} value={role}>
        {Role.getLabel(role)}
      </MenuItem>
    ))}
  </DefaultTextField>
);
