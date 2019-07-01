import * as React from 'react';
import { useState } from 'react';
import { ComponentType } from 'react';
import { fireEvent } from 'react-testing-library';
import { renderInApp } from '../../../App/test/renderInApp';
import { AsyncAutoSuggest } from '../AsyncAutoSuggest';
import { AutoSuggest } from './AutoSuggest';

describe('AutoSuggest', () => {
  const allSuggestions: AutoSuggest.Suggestion[] = [
    {
      label: 'Dog',
      value: 'dog'
    },
    {
      label: 'Cat',
      value: 'cat'
    }
  ];
  let onSuggestionsFetchRequested: jest.Mock;
  let onSuggestionsClearRequested: jest.Mock;
  let onSuggestionSelected: jest.Mock;
  let AutoSuggestStateful: ComponentType<AutoSuggest.Props>;

  beforeEach(() => {
    onSuggestionsFetchRequested = jest.fn();
    onSuggestionsClearRequested = jest.fn();
    onSuggestionSelected = jest.fn();

    AutoSuggestStateful = (props: AsyncAutoSuggest.Props) => {
      const [query, setQuery] = useState('');

      return (
        <AutoSuggest {...props} value={query} onChange={(event) => setQuery(event.target.value)} />
      );
    };
  });

  it('should render suggestions and select one on click', async () => {
    const { getByText, getMuiTextFieldInputByLabel } = renderInApp(
      <AutoSuggestStateful
        label="Animal"
        name="animal"
        suggestions={allSuggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
      />
    );

    const inputEl = getMuiTextFieldInputByLabel('Animal');

    expect(inputEl).toBeDefined();

    // focus and type into input element to make suggestions visible
    fireEvent.focus(inputEl);
    fireEvent.change(inputEl, { target: { value: 'Cat' } });
    expect(onSuggestionsFetchRequested).toBeCalledWith({
      reason: 'input-changed',
      value: 'Cat'
    });

    expect(getByText('Dog')).toBeDefined();
    expect(getByText('Cat')).toBeDefined();

    // click on Dog suggestion
    fireEvent.click(getByText('Dog'));
    expect(onSuggestionSelected).toBeCalledWith(expect.anything(), {
      method: 'click',
      sectionIndex: null,
      suggestion: {
        label: 'Dog',
        value: 'dog'
      },
      suggestionIndex: 0,
      suggestionValue: 'dog'
    });
  });
});
