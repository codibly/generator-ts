import TableCell from '@material-ui/core/TableCell';
import TableHead, { TableHeadProps } from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { Sorting } from 'Api/model/Sorting';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { DataTableColumn } from '../DataTableColumn';
import { FiltersMap } from '../FiltersMap';
import { DataTableFilterPopper } from './DataTableFilterPopper/DataTableFilterPopper';
import { HeaderCheckbox, HeaderColumnCell } from './DataTableHeader.style';

export namespace DataTableHeader {
  export type Props<T = any> = TableHeadProps & {
    columns: DataTableColumn<T>[];
    sorting: Sorting | null;
    filters?: FiltersMap;
    selectable?: boolean;
    selectedAll?: boolean;
    selectedSome?: boolean;
    onChangeSorting?: (
      event: React.MouseEvent<HTMLElement, MouseEvent>,
      sorting: Sorting | null
    ) => void;
    onChangeFilters?: (filters: FiltersMap) => void;
    onToggleSelection?: () => void;
  };
}

export const DataTableHeader: FunctionComponent<DataTableHeader.Props> = ({
  columns,
  sorting,
  filters,
  selectable,
  selectedAll,
  selectedSome,
  onChangeSorting,
  onChangeFilters,
  onToggleSelection,
  ...props
}) => (
  <TableHead {...props}>
    <TableRow>
      {selectable && (
        <TableCell padding="checkbox">
          <HeaderCheckbox
            indeterminate={selectedSome && !selectedAll}
            checked={selectedAll}
            onClick={onToggleSelection}
          />
        </TableCell>
      )}
      {columns.map((column) => (
        <HeaderColumnCell
          variant="head"
          key={column.key}
          sortDirection={sorting && column.key === sorting.field ? sorting.direction : false}
        >
          {column.sortable ? (
            <Tooltip title={`Sort by ${column.label}`} placement="bottom-start" enterDelay={300}>
              <TableSortLabel
                hideSortIcon={false}
                active={!!(sorting && sorting.field === column.key)}
                direction={sorting ? sorting.direction : 'asc'}
                onClick={(event) =>
                  onChangeSorting &&
                  onChangeSorting(
                    event,
                    sorting && sorting.field === column.key
                      ? Sorting.flip(sorting)
                      : Sorting.create(column.key)
                  )
                }
              >
                {column.label}
              </TableSortLabel>
            </Tooltip>
          ) : (
            column.label
          )}
          {column.filter && (
            <Tooltip title={`Filter by ${column.label}`} placement="bottom-start" enterDelay={300}>
              <DataTableFilterPopper
                schema={column.filter}
                value={(filters || {})[column.key]}
                onChange={(columnFilters) =>
                  onChangeFilters &&
                  onChangeFilters({
                    ...(filters || {}),
                    [column.key]: columnFilters
                  })
                }
              />
            </Tooltip>
          )}
        </HeaderColumnCell>
      ))}
    </TableRow>
  </TableHead>
);
