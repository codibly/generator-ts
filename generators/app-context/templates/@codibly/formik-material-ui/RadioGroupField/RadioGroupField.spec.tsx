import { getMuiRadioOrCheckboxLabelByText } from '@codibly/material-ui-testing';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { tick } from '../../../App/test/util/tick';
import { RadioGroupField } from './RadioGroupField';

describe('RadioGroupField', () => {
  it('should display validation errors', async () => {
    const onSubmit = jest.fn();
    const initialValues = {
      answer: undefined
    };
    const VALIDATION_ERROR = 'Validation error';

    const { getByText, queryByText } = render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <RadioGroupField
            name="answer"
            label="Answer"
            options={[{ value: 'YES', label: 'Yes' }]}
            validate={() => VALIDATION_ERROR}
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    );

    expect(queryByText(VALIDATION_ERROR)).toBeFalsy();

    fireEvent.click(getByText('Submit'));
    await tick();

    expect(getByText(VALIDATION_ERROR)).toBeDefined();
  });
});
