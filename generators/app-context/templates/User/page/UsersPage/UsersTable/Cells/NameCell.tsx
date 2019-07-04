import TableCell from '@material-ui/core/TableCell';
import { DataTableBodyCellProps } from '@codibly/material-ui';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { User } from '../../../../model/User';

export namespace NameCell {
  export type Props = DataTableBodyCellProps<User>;
}

export const NameCell: FunctionComponent<NameCell.Props> = ({ data: user, ...props }) => (
  <TableCell {...props}>
    {user.firstName} {user.lastName}
  </TableCell>
);
