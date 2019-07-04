import styled from '@emotion/styled';
import { ButtonProps } from '@material-ui/core/Button';
import { SubmitButton } from '@codibly/material-ui';
import { theme } from 'App/theme';
import { Field, Form } from 'formik';
import { ComponentType } from 'react';

export const FormContainer = styled(Form)({
  margin: '70px 0 20px 0'
});

export const FieldsContainer = styled.div({
  margin: '20px 0 40px 0',
  width: 320,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    padding: 0,
    width: 250
  }
});

export const LoginField = styled(Field)({
  height: 75
});

export const RememberMeContainer = styled.div({
  padding: '0 .5em'
});

export const LoginButtonContainer = styled.div({
  margin: '20px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const LoginButton = styled(SubmitButton)({
  width: 180
}) as ComponentType<ButtonProps>;

export const ErrorContainer = styled.div({
  display: 'flex',
  justifyContent: 'center'
});
