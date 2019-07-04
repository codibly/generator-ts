import TableCell from '@material-ui/core/TableCell';
import { DataTableBodyCellProps } from '@codibly/material-ui';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { User } from '../../../../model/User';

export namespace UsernameCell {
  export type Props = DataTableBodyCellProps<User>;
}

export const UsernameCell: FunctionComponent<UsernameCell.Props> = ({ data: user, ...props }) => (
  <TableCell {...props}>{user.email}</TableCell>
);
