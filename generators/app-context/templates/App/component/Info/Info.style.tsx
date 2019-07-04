import styled from '@emotion/styled';
import Typography, { TypographyProps } from '@material-ui/core/Typography/Typography';
import * as React from 'react';
import { ComponentType } from 'react';

export const InfoRow = styled.div({
  padding: '.5em .5em',
  minWidth: 500,
  alignItems: 'flex-start',
  display: 'flex'
});

export const InfoLabel = styled(Typography)({
  width: 150,
  flexShrink: 0,
  lineHeight: 1.8
}) as ComponentType<TypographyProps>;

export const InfoValue = styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}) as ComponentType<TypographyProps>;
