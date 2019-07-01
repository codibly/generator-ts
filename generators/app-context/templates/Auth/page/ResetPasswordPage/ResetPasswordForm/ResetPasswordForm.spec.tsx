import { renderInApp, RenderInAppResult } from 'App/test/renderInApp';
import { tick } from 'App/test/util/tick';
import * as React from 'react';
import { fireEvent, RenderResult } from '@testing-library/react';
import { ResetPasswordFormDumb } from './ResetPasswordForm';
import { ResetPasswordFormData } from './ResetPasswordForm.data';

describe('Reset Password Form', () => {
  const initialValues = ResetPasswordFormData.initialValues();

  let onSubmit: jest.Mock;

  let rendered: RenderInAppResult;
  let passwordInput: HTMLElement;
  let confirmedPasswordInput: HTMLElement;
  let submitButton: HTMLElement;

  const getSubmitButton = ({ getByText }: RenderResult) =>
    getByText('Save password').parentNode as HTMLButtonElement;

  beforeEach(async () => {
    onSubmit = jest.fn();
    rendered = renderInApp(
      <ResetPasswordFormDumb initialValues={initialValues} onSubmit={onSubmit} />
    );

    passwordInput = rendered.getMuiTextFieldInputByLabel('Password');
    confirmedPasswordInput = rendered.getMuiTextFieldInputByLabel('Confirm Password');
    submitButton = getSubmitButton(rendered);

    expect(passwordInput).toBeTruthy();
    expect(confirmedPasswordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should submit reset password form', async () => {
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmedPasswordInput, { target: { value: 'password' } });

    await tick();
    fireEvent.click(submitButton);

    // tslint:disable:no-hardcoded-credentials
    await tick();
    expect(onSubmit).toBeCalledWith(
      {
        password: 'password',
        confirmedPassword: 'password'
      },
      expect.anything()
    );
    // tslint:enable:no-hardcoded-credentials
  });

  it('should validate if passwords matches', async () => {
    const { getByText } = rendered;

    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(confirmedPasswordInput, { target: { value: 'differentPassword' } });

    await tick();
    fireEvent.click(submitButton);

    await tick();
    expect(onSubmit).not.toBeCalled();
    expect(getByText('Passwords do not match')).toBeTruthy();
  });
});
