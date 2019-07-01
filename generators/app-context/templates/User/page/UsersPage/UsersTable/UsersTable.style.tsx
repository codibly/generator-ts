import styled from '@emotion/styled';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { ComponentType } from 'react';

export const TableContainer = styled(Paper)({
  marginTop: 20
}) as ComponentType<PaperProps>;
