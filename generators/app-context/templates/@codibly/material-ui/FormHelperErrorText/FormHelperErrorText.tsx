import styled from '@emotion/styled';
import red from '@material-ui/core/colors/red';
import FormHelperText, { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import { ComponentType } from 'react';

export const ErrorText = styled(FormHelperText)({
  color: red[500]
}) as ComponentType<FormHelperTextProps>;
