import { Formik } from 'formik';
import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { waitForSubmission } from '@codibly/test-utils';
import { SubmitButton } from './SubmitButton';

describe('SubmitButton', () => {
  it('should trigger submit on form', async () => {
    const onSubmit = jest.fn();

    const rendered = render(
      <Formik initialValues={{ value: 'test' }} onSubmit={onSubmit}>
        <SubmitButton>Submit</SubmitButton>
      </Formik>
    );

    const submitButton = rendered.getByText('Submit');
    expect(submitButton).toBeTruthy();

    fireEvent.click(submitButton);

    await waitForSubmission();

    expect(onSubmit).toBeCalledWith({ value: 'test' }, expect.anything());
  });

  it('should throw error on click if outside Formik component', async () => {
    // hide console.error output
    // tslint:disable-next-line
    console.error = jest.fn();

    expect(() => render(<SubmitButton>Submit</SubmitButton>)).toThrowError(
      '<SubmitButton/> must be rendered inside <Formik/> component.'
    );
  });
});
