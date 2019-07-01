import styled from '@emotion/styled';
import Card, { CardProps } from '@material-ui/core/Card';
import { ComponentType } from 'react';

export const CardContainer = styled(Card)({
  maxWidth: 700,
  padding: 30
}) as ComponentType<CardProps>;
