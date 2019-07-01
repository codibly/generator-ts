import { DataTableColumn } from 'App/component/DataTable/DataTableColumn';
import * as React from 'react';
import { Role } from '../../../model/Role';
import { User } from '../../../model/User';
import { ActionsCell } from './Cells/ActionsCell';
import { NameCell } from './Cells/NameCell';
import { RoleCell } from './Cells/RoleCell';
import { UsernameCell } from './Cells/UsernameCell';

export namespace UsersTableData {
  export const columns: DataTableColumn<User>[] = [
    {
      label: 'Name',
      key: 'firstName',
      sortable: true,
      BodyCellComponent: NameCell
    },
    {
      label: 'Username',
      key: 'email',
      sortable: true,
      BodyCellComponent: UsernameCell
    },
    {
      label: 'Role',
      key: 'role',
      filter: {
        type: 'enum',
        config: {
          options: Role.getAll().map((role) => ({
            label: Role.getLabel(role),
            value: role
          }))
        }
      },
      BodyCellComponent: RoleCell
    },
    {
      label: 'Actions',
      key: 'actions',
      align: 'right',
      BodyCellComponent: ActionsCell
    }
  ];
}
