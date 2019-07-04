import TableFooter, { TableFooterProps } from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Pagination } from '@codibly/redux-query';
import * as React from 'react';
import { FunctionComponent } from 'react';

export namespace DataTableFooter {
  export type Props = TableFooterProps & {
    pagination: Pagination.Statistics;
    perPageOptions?: Pagination['perPage'][];
    onChangePage: (
      event: React.MouseEvent<HTMLElement, MouseEvent> | null,
      page: Pagination['page']
    ) => void;
    onChangePerPage?: (
      event: React.ChangeEvent<HTMLElement> | null,
      perPage: Pagination['perPage']
    ) => void;
  };
}

export const DataTableFooter: FunctionComponent<DataTableFooter.Props> = ({
  pagination,
  perPageOptions,
  onChangePage,
  onChangePerPage,
  ...props
}) => (
  <TableFooter {...props}>
    <TableRow>
      <TablePagination
        page={pagination ? pagination.page - 1 : 0}
        rowsPerPage={pagination ? pagination.perPage : 10}
        count={pagination ? pagination.count || 0 : 0}
        rowsPerPageOptions={onChangePerPage ? perPageOptions || [10, 25, 50, 100] : []}
        onChangePage={(event, page) => onChangePage(event, page + 1)}
        onChangeRowsPerPage={(event) =>
          onChangePerPage ? onChangePerPage(event, Number(event.target.value)) : null
        }
      />
    </TableRow>
  </TableFooter>
);
