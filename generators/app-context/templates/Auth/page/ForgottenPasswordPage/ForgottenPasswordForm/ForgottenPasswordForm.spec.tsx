import { renderInApp, RenderInAppResult } from 'App/test/renderInApp';
import { tick } from 'App/test/util/tick';
import * as React from 'react';
import { fireEvent, RenderResult } from '@testing-library/react';
import { ForgottenPasswordFormDumb } from './ForgottenPasswordForm';
import { ForgottenPasswordFormData } from './ForgottenPasswordForm.data';

describe('Forgotten Password Form', () => {
  const initialValues = ForgottenPasswordFormData.initialValues();

  let onSubmit: jest.Mock;
  let rendered: RenderInAppResult;
  let emailInput: HTMLElement;
  let submitButton: HTMLElement;

  const getSubmitButton = ({ getByText }: RenderResult) =>
    getByText('Send link').parentNode as HTMLButtonElement;

  beforeEach(async () => {
    onSubmit = jest.fn();
    rendered = renderInApp(
      <ForgottenPasswordFormDumb initialValues={initialValues} onSubmit={onSubmit} />
    );

    emailInput = rendered.getMuiTextFieldInputByLabel('Email');
    submitButton = getSubmitButton(rendered);

    expect(emailInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should submit forgotten password form', async () => {
    fireEvent.change(emailInput, { target: { value: 'email@example.com' } });

    await tick();
    fireEvent.click(submitButton);

    await tick();
    expect(onSubmit).toBeCalledWith(
      {
        email: 'email@example.com'
      },
      expect.anything()
    );
  });

  it('should validate forgotten password form', async () => {
    const { getByText } = rendered;

    fireEvent.change(emailInput, { target: { value: 'badEmail@email' } });

    await tick();
    fireEvent.click(submitButton);

    await tick();
    expect(onSubmit).not.toBeCalled();
    expect(getByText('Please enter a valid email address')).toBeTruthy();
  });

  it('should redirect to login page', async () => {
    const { getByText } = rendered;
    const loginButton = getByText('Login page');

    expect(loginButton).toBeTruthy();
    fireEvent.click(loginButton);
  });
});
