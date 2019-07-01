import styled from '@emotion/styled';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { ComponentType } from 'react';

export const IndirectlyDisabledInfo = styled(Typography)({
  marginTop: '.5em'
}) as ComponentType<TypographyProps>;
