import { TableCellProps } from '@material-ui/core/TableCell';

// there is no defined component - only typings for components that developer will implement in order
// to render body cell
export type DataTableBodyCellProps<T> = TableCellProps & { data: T };
