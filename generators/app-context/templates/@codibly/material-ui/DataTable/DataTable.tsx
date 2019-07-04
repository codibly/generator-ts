import Table, { TableProps } from '@material-ui/core/Table';
import { Pagination, Sorting } from '@codibly/redux-query';
import * as React from 'react';
import { FunctionComponent, ReactNode } from 'react';
import { LoadableTable } from './DataTable.style';
import { DataTableBody } from './DataTableBody/DataTableBody';
import { DataTableColumn } from './DataTableColumn';
import { DataTableFooter } from './DataTableFooter/DataTableFooter';
import { DataTableHeader } from './DataTableHeader/DataTableHeader';
import { DataTableToolbar } from './DataTableToolbar/DataTableToolbar';
import { FiltersMap } from './FiltersMap';

export namespace DataTable {
  export type DataId<T extends { id: any } = any> = T['id'];
  export type Props<T extends { id: any } = any> = TableProps & {
    // sorting
    sorting: DataTableHeader.Props['sorting'];
    onChangeSorting: (sorting: Sorting | null) => void;

    // pagination
    pagination: DataTableFooter.Props['pagination'];
    perPageOptions?: DataTableFooter.Props['perPageOptions'];
    onChangePage: (page: Pagination['page']) => void;
    onChangePerPage?: (perPage: Pagination['perPage']) => void;

    // selection
    selectable?: boolean;
    selection?: DataId<T>[];
    onChangeSelection?: (selection: DataId<T>[]) => void;

    // filter
    filters?: FiltersMap;
    onChangeFilters?: (filters: FiltersMap) => void;

    // data
    columns: DataTableColumn<T>[];
    data: T[];
    loading?: boolean;

    // component props
    DataTableHeaderProps?: Partial<DataTableHeader.Props>;
    DataTableBodyProps?: Partial<DataTableBody.Props>;
    DataTableFooterProps?: Partial<DataTableFooter.Props>;

    // custom components
    noDataMessage?: ReactNode;
    batchActions?: ReactNode;
  };
}

export const DataTable: FunctionComponent<DataTable.Props> = ({
  sorting,
  onChangeSorting,
  pagination,
  perPageOptions,
  onChangePage,
  onChangePerPage,
  filters,
  onChangeFilters,
  selectable,
  selection,
  onChangeSelection,
  columns,
  data,
  loading,
  DataTableHeaderProps,
  DataTableBodyProps,
  DataTableFooterProps,
  batchActions,
  noDataMessage,
  ...props
}) => (
  <>
    {selectable && selection && selection.length !== 0 && (
      <DataTableToolbar selected={selection.length} batchActions={batchActions} />
    )}
    <LoadableTable {...props} loading={loading}>
      <DataTableHeader
        {...DataTableHeaderProps || {}}
        columns={columns}
        sorting={sorting}
        onChangeSorting={(event, newSorting) => onChangeSorting(newSorting)}
        filters={filters}
        onChangeFilters={onChangeFilters}
        selectable={selectable}
        selectedAll={
          selectable
            ? !!data.length && data.every((row) => (selection || []).includes(row.id))
            : false
        }
        selectedSome={
          selectable
            ? !!data.length && data.some((row) => (selection || []).includes(row.id))
            : false
        }
        onToggleSelection={() =>
          data.every((row) => (selection || []).includes(row.id))
            ? onChangeSelection && onChangeSelection([])
            : onChangeSelection && onChangeSelection(data.map((row) => row.id))
        }
      />
      <DataTableBody
        {...DataTableBodyProps || {}}
        columns={columns}
        data={data}
        loading={loading}
        selectable={selectable}
        selection={selection}
        onChangeSelection={onChangeSelection}
        numberOfRows={pagination.perPage}
        noDataMessage={noDataMessage}
      />
      <DataTableFooter
        {...DataTableFooterProps || {}}
        pagination={pagination}
        perPageOptions={perPageOptions}
        onChangePage={(event, newPage) => onChangePage(newPage)}
        onChangePerPage={(event, newPerPage) =>
          onChangePerPage ? onChangePerPage(newPerPage) : null
        }
      />
    </LoadableTable>
  </>
);
