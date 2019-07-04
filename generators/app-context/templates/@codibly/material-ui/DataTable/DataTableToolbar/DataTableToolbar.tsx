import { TableHeadProps } from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { ReactNode } from 'react';
import { ActionsToolbar } from './DataTableToolbar.style';

export namespace DataTableToolbar {
  export type Props<T = any> = TableHeadProps & {
    selected: number;
    batchActions?: ReactNode;
  };
}

export const DataTableToolbar: FunctionComponent<DataTableToolbar.Props> = ({
  selected,
  batchActions,
  ...props
}) => (
  <ActionsToolbar>
    <div>
      <Typography variant="body1">{selected} selected</Typography>
    </div>
    {batchActions}
  </ActionsToolbar>
);
