import { GetSuggestionValue } from 'react-autosuggest';
import { AutoSuggest } from './AutoSuggest';

export const getSuggestionValue: GetSuggestionValue<AutoSuggest.Suggestion> = (suggestion) =>
  String(suggestion.value);
