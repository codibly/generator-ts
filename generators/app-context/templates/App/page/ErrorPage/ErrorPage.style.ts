import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { darkBlue } from '../../theme';

export const ErrorPageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  textAlign: 'center'
});

export const StyledLink = styled.span({
  color: darkBlue,
  textDecoration: 'none',
  cursor: 'pointer'
});
