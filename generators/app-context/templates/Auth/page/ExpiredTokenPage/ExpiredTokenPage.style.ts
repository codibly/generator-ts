import styled from '@emotion/styled';
import Button, { ButtonProps } from '@material-ui/core/Button';
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
  backgroundColor: loginBackgroundColor,
});

export const ExpiredTokenCard = styled(Card)({
  padding: '40px 60px',
  borderRadius: 10,
  [theme.breakpoints.down('sm')]: {
    padding: 10
  }
}) as ComponentType<CardProps>;

export const ButtonContainer = styled.div({
  margin: '20px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const ExpiredTokenText = styled(Typography)({
  marginBottom: 40
}) as ComponentType<TypographyProps>;

export const RecoveryPasswordButton = styled(Button)({
  width: 260
}) as ComponentType<ButtonProps>;
