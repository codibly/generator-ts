import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import { RenderSuggestionsContainer } from 'react-autosuggest';

export const renderSuggestionsContainer: RenderSuggestionsContainer = (options) => (
  <Paper {...options.containerProps} component="div">
    {options.children}
  </Paper>
);
