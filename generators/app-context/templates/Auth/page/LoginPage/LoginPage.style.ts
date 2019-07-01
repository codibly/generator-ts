import styled from '@emotion/styled';
import Card, { CardProps } from '@material-ui/core/Card';
import { loginBackgroundColor, theme } from 'App/theme';
import { ComponentType } from 'react';

export const LoginCardContainer = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: loginBackgroundColor,
});

export const LoginCard = styled(Card)({
  padding: '40px 60px',
  borderRadius: 10,
  [theme.breakpoints.down('sm')]: {
    padding: 10
  }
}) as ComponentType<CardProps>;
