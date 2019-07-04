import styled from '@emotion/styled';
import { Checkbox } from '@material-ui/core';
import { CheckboxProps } from '@material-ui/core/Checkbox';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import { ComponentType } from 'react';
import * as React from 'react';

export const HeaderCheckbox = styled((props) => (
  <Checkbox classes={{ checked: 'checked' }} {...props} />
))({
  color: 'white',
  opacity: 0.8,
  '&.checked': {
    color: 'white'
  }
}) as ComponentType<CheckboxProps>;

export const HeaderColumnCell = styled(TableCell)({
  position: 'relative',
  paddingRight: '50px !important'
}) as ComponentType<TableCellProps>;
