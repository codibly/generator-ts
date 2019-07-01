import styled from '@emotion/styled';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { darkBlue, theme } from 'App/theme';
import { Field, Form } from 'formik';
import { ComponentType } from 'react';
import { Link } from 'react-router-dom';

export const FormContainer = styled(Form)({
  margin: '30px 0 0px 0'
});

export const LoginField = styled(Field)({
  height: 75,
  margin: '10px 0',
  width: 320,
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    padding: 0,
    width: 250
  }
});

export const ButtonContainer = styled.div({
  marginBottom: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const SendLinkButton = styled(Button)({
  width: 180
}) as ComponentType<ButtonProps>;

export const ErrorContainer = styled.div({
  display: 'flex',
  justifyContent: 'center'
});

export const RedirectLink = styled(Link)({
  color: darkBlue,
  textDecoration: 'none'
});
