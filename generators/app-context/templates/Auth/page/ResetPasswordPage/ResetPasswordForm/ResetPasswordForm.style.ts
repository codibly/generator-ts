import styled from '@emotion/styled';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { theme } from 'App/theme';
import { Form } from 'formik';
import { ComponentType } from 'react';
import { TextField } from 'App/form/TextField/TextField';

export const FormContainer = styled(Form)({
  margin: '30px 0 20px 0'
});

export const LoginField = styled(TextField)({
  height: 75,
  width: 320,
  [theme.breakpoints.down('sm')]: {
    margin: 0,
    padding: 0,
    width: 250
  }
}) as ComponentType<TextField.Props>;

export const FieldsContainer = styled.div({
  margin: '20px 0 20px 0',
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

export const ButtonContainer = styled.div({
  margin: '20px 0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

export const SendLinkButton = styled(Button)({
  width: 200
}) as ComponentType<ButtonProps>;

export const ErrorContainer = styled.div({
  display: 'flex',
  justifyContent: 'center'
});
