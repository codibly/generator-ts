import styled from '@emotion/styled';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { ComponentType } from 'react';

export const LoaderWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  padding: 15,
  boxSizing: 'border-box'
});

export const LoaderMessage = styled(Typography)({
  display: 'inline-block',
  padding: '1em'
}) as ComponentType<TypographyProps>;
