import styled from '@emotion/styled';
import { CircularProgress } from '@material-ui/core';
import { CircularProgressProps } from '@material-ui/core/CircularProgress';
import { ComponentType } from 'react';

export const ButtonProgress = styled(CircularProgress)({
  position: 'absolute'
}) as ComponentType<CircularProgressProps>;
