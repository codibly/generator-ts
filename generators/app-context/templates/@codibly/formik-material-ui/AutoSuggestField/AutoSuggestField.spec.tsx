import { Form, Formik } from 'formik';
import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderInApp } from '../../../App/test/renderInApp';
import { tick } from '../../../App/test/util/tick';
import { AutoSuggest } from '../../material-ui/AutoSuggest';
import { AutoSuggestField } from './AutoSuggestField';

describe('AutoSuggestField', () => {
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

  beforeEach(() => {
    onSuggestionsFetchRequested = jest.fn();
    onSuggestionsClearRequested = jest.fn();
    onSuggestionSelected = jest.fn();
  });

  it('should show suggestions and update formik value', async () => {
    const initialValues = {
      animal: ''
    };
    const onSubmit = jest.fn();

    const { getByText, getMuiTextFieldInputByLabel } = renderInApp(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <AutoSuggestField
            label="Animal"
            name="animal"
            suggestions={allSuggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={(event, { suggestion }, { form, field }) => {
              form.setFieldValue(field.name, suggestion.value);
            }}
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    );

    const inputEl = getMuiTextFieldInputByLabel('Animal');
    expect(inputEl).toBeDefined();

    // focus and type into input element to make suggestions visible
    fireEvent.focus(inputEl);
    fireEvent.change(inputEl, { target: { value: 'cat' } });
    expect(onSuggestionsFetchRequested).toBeCalledWith({
      reason: 'input-changed',
      value: 'cat'
    });

    expect(getByText('Dog')).toBeDefined();
    expect(getByText('Cat')).toBeDefined();

    // try to send current form
    fireEvent.click(getByText('Submit'));
    await tick();
    expect(onSubmit).toBeCalledWith(
      {
        animal: 'cat'
      },
      expect.anything()
    );

    // click on Dog suggestion
    fireEvent.click(getByText('Dog'));

    // try to send current form
    fireEvent.click(getByText('Submit'));
    await tick();
    expect(onSubmit).toBeCalledWith(
      {
        animal: 'dog'
      },
      expect.anything()
    );
  });
});
