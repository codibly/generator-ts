import styled from '@emotion/styled';
import Card, { CardProps } from '@material-ui/core/Card';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { loginBackgroundColor, theme } from 'App/theme';
import { ComponentType } from 'react';

export const CardContainer = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: loginBackgroundColor
});

export const ForgottenPasswordCard = styled(Card)({
  padding: '40px 60px',
  borderRadius: 10,
  [theme.breakpoints.down('sm')]: {
    padding: 10
  }
}) as ComponentType<CardProps>;


export const ForgotPasswordText = styled(Typography)({
  marginBottom: 30
}) as ComponentType<TypographyProps>;
