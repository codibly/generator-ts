import { ListItem } from '@material-ui/core';
import * as React from 'react';
import { RenderSuggestionParams } from 'react-autosuggest';
import { AutoSuggest } from './AutoSuggest';

export function renderSuggestion<
  TSuggestion extends AutoSuggest.Suggestion = AutoSuggest.Suggestion
>(suggestion: TSuggestion, { isHighlighted }: RenderSuggestionParams) {
  return (
    <ListItem selected={isHighlighted} button component="div">
      {suggestion.label}
    </ListItem>
  );
}
