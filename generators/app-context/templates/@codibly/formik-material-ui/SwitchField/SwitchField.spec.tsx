import { Form, Formik, FormikActions } from 'formik';
import * as React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { tick } from '@codibly/test-utils';
import { SwitchField } from './SwitchField';

describe('SwitchField(Formik)', () => {
  const getSwitchByText = (text: string, { getByText }: RenderResult): HTMLElement =>
    getByText(text).parentNode as HTMLElement;

  it('should connect SwitchField to Formik', async () => {
    const onSubmit = jest.fn((data, actions: FormikActions<any>) => {
      actions.setSubmitting(false);
    });

    const rendered = render(
      <Formik initialValues={{ test: false }} onSubmit={onSubmit}>
        <Form>
          <SwitchField name="test" disabledLabel="Disabled" enabledLabel="Enabled" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    );

    let switchEl = getSwitchByText('Disabled', rendered);
    const buttonEl = rendered.getByText('Submit');

    fireEvent.click(switchEl);

    expect(rendered.getByText('Enabled')).toBeTruthy();
    expect(rendered.queryByText('Disabled')).toBeFalsy();

    fireEvent.click(buttonEl);

    await tick();

    expect(onSubmit).toBeCalledWith({ test: true }, expect.anything());

    switchEl = getSwitchByText('Enabled', rendered);
    fireEvent.click(switchEl);

    expect(rendered.getByText('Disabled')).toBeTruthy();
    expect(rendered.queryByText('Enabled')).toBeFalsy();

    fireEvent.click(buttonEl);

    await tick();

    expect(onSubmit).toBeCalledWith({ test: false }, expect.anything());
  });
});
