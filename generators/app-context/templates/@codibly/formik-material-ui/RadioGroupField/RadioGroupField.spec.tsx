import { getMuiRadioOrCheckboxLabelByText } from '@codibly/material-ui-testing/query';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { tick } from '../../../App/test/util/tick';
import { RadioGroupField } from './RadioGroupField';

describe('RadioGroupField', () => {
  it('should integrate with Formik', async () => {
    const onSubmit = jest.fn();
    const initialValues = {
      answer: undefined
    };

    const { container, getByText } = render(
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <RadioGroupField
            name="answer"
            label="Answer"
            options={[{ value: 'YES', label: 'Yes' }, { value: 'NO', label: 'No' }]}
          />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    );

    expect(container.firstChild).toMatchSnapshot();

    fireEvent.click(getMuiRadioOrCheckboxLabelByText('Yes'));
    fireEvent.click(getByText('Submit'));
    await tick();

    expect(onSubmit).toBeCalledWith(
      {
        answer: 'YES'
      },
      expect.anything()
    );

    fireEvent.click(getMuiRadioOrCheckboxLabelByText('No'));
    fireEvent.click(getByText('Submit'));
    await tick();

    expect(onSubmit).toBeCalledWith(
      {
        answer: 'NO'
      },
      expect.anything()
    );
  });

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
