import styled from '@emotion/styled';
import Typography, { TypographyProps } from '@material-ui/core/Typography/Typography';
import { ComponentType } from 'react';

export const PageHeader = styled(Typography)({
  margin: '0.8em 0 1.5em 0',
  fontSize: 30
}) as ComponentType<TypographyProps>;
