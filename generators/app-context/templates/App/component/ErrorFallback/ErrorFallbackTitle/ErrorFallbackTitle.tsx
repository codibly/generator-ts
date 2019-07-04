import Typography, { TypographyProps } from '@material-ui/core/Typography';
import { FunctionComponent } from 'react';
import * as React from 'react';
import { Omit } from 'utility-types';

export const ErrorFallbackTitle: FunctionComponent<Omit<TypographyProps, 'variant'>> = (props) => (
  <Typography variant="h6" {...props} />
);
