import styled from '@emotion/styled';
import { TableCell } from '@material-ui/core';
import { TableCellProps } from '@material-ui/core/TableCell';
import { ComponentType } from 'react';

export const ActionsTableCell = styled(TableCell)({
  paddingTop: 8,
  paddingBottom: 8
}) as ComponentType<TableCellProps>;
