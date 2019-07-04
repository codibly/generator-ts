import TableBody, { TableBodyProps } from '@material-ui/core/TableBody';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactNode } from 'react';
import { DataTable } from '../DataTable';
import { DataTableBodyRow } from '../DataTableBodyRow/DataTableBodyRow';
import { DataTableColumn } from '../DataTableColumn';
import { DataTableNoDataPlaceholder } from './DataTableNoDataPlaceholder/DataTableNoDataPlaceholder';

export namespace DataTableBody {
  export type Props<T = any> = TableBodyProps & {
    data: T[];
    loading?: boolean;
    columns: DataTableColumn<T>[];
    selectable?: boolean;
    selection?: DataTable.DataId[];
    onChangeSelection?: (selection: DataTable.DataId[]) => void;
    numberOfRows: number;
    noDataMessage?: ReactNode;
  };
}

export const DataTableBody: FunctionComponent<DataTableBody.Props> = ({
  data,
  columns,
  loading,
  selectable,
  selection,
  onChangeSelection,
  numberOfRows,
  noDataMessage,
  ...props
}) => (
  <TableBody {...props}>
    {data.length === 0 && (
      <DataTableNoDataPlaceholder
        loading={loading}
        numberOfRows={numberOfRows}
        numberOfColumns={selectable ? columns.length + 1 : columns.length}
        noDataMessage={noDataMessage}
      />
    )}
    {data.map((row, index) => (
      <DataTableBodyRow
        key={row.id || index}
        data={row}
        columns={columns}
        selectable={selectable}
        selected={selectable && (selection || []).includes(row.id)}
        onSelect={() =>
          selectable && (selection || []).includes(row.id)
            ? onChangeSelection &&
              onChangeSelection((selection || []).filter((id) => id !== row.id))
            : onChangeSelection && onChangeSelection((selection || []).concat([row.id]))
        }
      />
    ))}
  </TableBody>
);
