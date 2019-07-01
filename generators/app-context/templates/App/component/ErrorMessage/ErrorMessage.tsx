import * as React from 'react';
import { FunctionComponent } from 'react';
import { ErrorContainer, ErrorText } from './ErrorMessage.style';

export const ErrorMessage: FunctionComponent = (props) => (
  <ErrorContainer>
    <ErrorText variant="caption">{props.children}</ErrorText>
  </ErrorContainer>
);
