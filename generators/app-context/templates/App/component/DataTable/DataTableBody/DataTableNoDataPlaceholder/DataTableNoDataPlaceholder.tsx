import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import { FunctionComponent, ReactNode } from 'react';
import {
  EmptyTableCellPlaceholder,
  EmptyTableMessage,
  EmptyTableMessageContainer
} from './DataTableNoDataPlaceholder.style';
import { DefaultNoDataMessage } from './DefaultNoDataMessage/DefaultNoDataMessage';

export namespace DataTableNoDataPlaceholder {
  export type Props = {
    numberOfRows: number;
    numberOfColumns: number;
    loading?: boolean;
    noDataMessage: ReactNode;
  };
}

export const DataTableNoDataPlaceholder: FunctionComponent<DataTableNoDataPlaceholder.Props> = ({
  numberOfRows,
  numberOfColumns,
  loading,
  noDataMessage
}) => (
  <tr>
    <EmptyTableCellPlaceholder numberOfRows={numberOfRows} colSpan={numberOfColumns}>
      <EmptyTableMessageContainer>
        <EmptyTableMessage>
          {loading ? <CircularProgress size={64} /> : noDataMessage || <DefaultNoDataMessage />}
        </EmptyTableMessage>
      </EmptyTableMessageContainer>
    </EmptyTableCellPlaceholder>
  </tr>
);
