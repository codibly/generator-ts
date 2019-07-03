import { AsyncStatus } from '@codibly/redux-async/Async.state';
import * as React from 'react';
import { ComponentType, useState } from 'react';
import { AutoSuggest } from '../AutoSuggest';
import { AsyncAutoSuggest } from './AsyncAutoSuggest';
import {render} from "@testing-library/react";
import {getMuiProgress, getMuiTextFieldInputByLabel} from "@codibly/material-ui-testing";

describe('AsyncAutoSuggest', () => {
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
  let AsyncAutoSuggestStateful: ComponentType<AsyncAutoSuggest.Props>;

  beforeEach(() => {
    onSuggestionsFetchRequested = jest.fn();
    onSuggestionsClearRequested = jest.fn();
    onSuggestionSelected = jest.fn();

    AsyncAutoSuggestStateful = (props: AsyncAutoSuggest.Props) => {
      const [query, setQuery] = useState('');

      return (
        <AsyncAutoSuggest
          {...props}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      );
    };
  });

  it('should render loader in pending status', async () => {
    const { container } = render(
      <AsyncAutoSuggestStateful
        label="Animal"
        name="animal"
        status={AsyncStatus.PENDING}
        suggestions={allSuggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
      />
    );

    expect(getMuiTextFieldInputByLabel('Animal', container)).toBeDefined();
    expect(getMuiProgress(container)).toBeDefined();
  });
});
