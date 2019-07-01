import { TableCellProps } from '@material-ui/core/TableCell';
import { ComponentType } from 'react';
import { DataTableBodyCellProps } from './DataTableBodyCell/DataTableBodyCell';
import { FiltersSchema } from './FiltersSchema';

export type DataTableColumn<T> = {
  key: string;
  label: string;
  sortable?: boolean;
  filter?: FiltersSchema;
  align?: TableCellProps['align'];
  BodyCellComponent?: ComponentType<DataTableBodyCellProps<T>>;
};
