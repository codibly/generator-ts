import { Typography } from '@material-ui/core';
import * as React from 'react';
import { FunctionComponent } from 'react';

export namespace DefaultNoDataMessage {
  export type Props = {};
}

export const DefaultNoDataMessage: FunctionComponent<DefaultNoDataMessage.Props> = (props) => (
  <Typography variant="h5" color="textSecondary">
    Sorry, but there are no matching results
  </Typography>
);
