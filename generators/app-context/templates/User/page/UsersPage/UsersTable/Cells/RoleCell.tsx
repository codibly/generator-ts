import TableCell from '@material-ui/core/TableCell';
import { DataTableBodyCellProps } from '@codibly/material-ui';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { Role } from '../../../../model/Role';
import { User } from '../../../../model/User';

export namespace RoleCell {
  export type Props = DataTableBodyCellProps<User>;
}

export const RoleCell: FunctionComponent<RoleCell.Props> = ({ data: user, ...props }) => (
  <TableCell {...props}>{Role.getLabel(user.role)}</TableCell>
);
