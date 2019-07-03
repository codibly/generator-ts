import MockAdapter from 'axios-mock-adapter';
import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import { http } from 'Api';
import { waitForSubmission, tick } from '@codibly/test-utils';
import { renderInApp, RenderInAppResult } from 'App/test/renderInApp'
import { ChangePasswordFormPure } from './ChangePasswordForm';
import { ChangePasswordFormData } from './ChangePasswordForm.data';

describe('Change user password form', () => {
  const initialValues = ChangePasswordFormData.initialValues();

  let onSubmit: jest.Mock;
  let onCancel: jest.Mock;
  let rendered: RenderInAppResult;
  let submitButton: HTMLElement;
  let currentPasswordInput: HTMLElement;
  let newPasswordInput: HTMLElement;
  let confirmPasswordInput: HTMLElement;

  const mock = new MockAdapter(http);

  beforeEach(async () => {
    mock.reset();

    onSubmit = jest.fn();
    onCancel = jest.fn();

    rendered = renderInApp(
      <ChangePasswordFormPure
        initialValues={initialValues}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    );
    submitButton = rendered.getByText('Change');
    currentPasswordInput = rendered.getMuiTextFieldInputByLabel('Current password');
    newPasswordInput = rendered.getMuiTextFieldInputByLabel('New password');
    confirmPasswordInput = rendered.getMuiTextFieldInputByLabel('Confirm password');
  });

  it('should submit form', async () => {
    fireEvent.change(currentPasswordInput, { target: { value: '12345678' } });
    fireEvent.change(newPasswordInput, { target: { value: '87654321' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '87654321' } });

    await tick();
    fireEvent.click(submitButton);

    await waitForSubmission();
    expect(onSubmit).toBeCalledWith(
      {
        current: '12345678',
        new: '87654321',
        confirmed: '87654321'
      },
      expect.anything()
    );
  });

  it('should validate change password form', async () => {
    const { getByText } = rendered;
    fireEvent.click(submitButton);

    await tick();

    expect(onSubmit).not.toBeCalled();
    expect(getByText('Please enter current password')).toBeTruthy();
    expect(getByText('Please enter new password')).toBeTruthy();
    expect(getByText('Please confirm new password')).toBeTruthy();
  });

  it('should validate new password matches', async () => {
    const { getByText } = rendered;

    fireEvent.change(currentPasswordInput, { target: { value: '12345678' } });
    fireEvent.change(newPasswordInput, { target: { value: '87654321' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '876543210' } });

    await tick();
    fireEvent.click(submitButton);
    await waitForSubmission();
    expect(getByText('Passwords do not match')).toBeTruthy();
  });
});
