import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { DataTableColumn } from '../DataTableColumn';

export namespace DataTableBodyRow {
  export type Props<T = any> = TableRowProps & {
    columns: DataTableColumn<T>[];
    data: T;
    selectable?: boolean;
    selected?: boolean;
    onSelect?: () => void;
  };
}

export const DataTableBodyRow: FunctionComponent<DataTableBodyRow.Props> = ({
  columns,
  data,
  selectable,
  selected,
  onSelect,
  ...props
}) => (
  <TableRow {...props}>
    {selectable && (
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelect} />
      </TableCell>
    )}
    {columns.map(({ BodyCellComponent, ...column }, index) =>
      BodyCellComponent ? (
        <BodyCellComponent key={column.key} data={data} variant="body" />
      ) : (
        <TableCell variant="body">{data[column.key] || ''}</TableCell>
      )
    )}
  </TableRow>
);
