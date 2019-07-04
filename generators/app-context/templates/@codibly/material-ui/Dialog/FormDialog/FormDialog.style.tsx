import styled from '@emotion/styled';
import Grid, { GridProps } from '@material-ui/core/Grid';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { ComponentType } from 'react';
import * as React from 'react';
import { Omit } from 'utility-types';

const SECTION_INDENT = 5;

export const FormDialogSection = styled.section({
  paddingLeft: SECTION_INDENT,
  paddingRight: SECTION_INDENT
});

export const FormDialogSubheader = styled(Typography)({
  marginBottom: 10,
  marginLeft: -SECTION_INDENT
}) as ComponentType<TypographyProps>;

export const FormDialogRow = styled((props) => <Grid container spacing={16} {...props} />)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}) as ComponentType<Omit<GridProps, 'container' | 'item'>>;

export const FormDialogCell = styled((props) => <Grid item {...props} />)({
  minHeight: 98 // to keep same height if error occurs
}) as ComponentType<Omit<GridProps, 'container' | 'item'>>;
