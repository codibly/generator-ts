import MockAdapter from 'axios-mock-adapter';
import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import { http } from 'Api';
import { renderInApp, RenderInAppResult } from 'App/test/renderInApp';
import { tick } from 'App/test/util/tick';
import { waitForSubmission } from 'App/test/util/waitForSubmission';
import { LoginPage } from './LoginPage';

describe('<LoginPage />', () => {
  let rendered: RenderInAppResult;
  const mock = new MockAdapter(http);

  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let loginButton: HTMLElement;
  let rememberMeLabel: HTMLElement;

  beforeEach(() => {
    mock.reset();
    rendered = renderInApp(<LoginPage />);

    const { getByText, getMuiTextFieldInputByLabel, getMuiRadioOrCheckboxLabelByText } = rendered;

    emailInput = getMuiTextFieldInputByLabel('Email');
    passwordInput = getMuiTextFieldInputByLabel('Password');
    loginButton = getByText('Login');
    rememberMeLabel = getMuiRadioOrCheckboxLabelByText('Remember me');
  });

  it('should display validation errors', async () => {
    const { getByText } = rendered;

    fireEvent.click(loginButton);
    await waitForSubmission();
    expect(getByText('Please enter an email')).toBeDefined();
    expect(getByText('Please enter a password')).toBeDefined();

    fireEvent.change(emailInput, { target: { value: 'invalid_email' } });
    await tick();
    expect(getByText('Please enter a valid email address')).toBeDefined();
  });

  it.each([['with remember me', true], ['without remember me', false]])(
    'should login %s',
    async (message, remember) => {
      const email = 'test@test.com';
      const secret = 'secret';

      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: secret } });
      if (remember) {
        fireEvent.click(rememberMeLabel);
      }
      fireEvent.click(loginButton);

      await waitForSubmission();

      const loginRequest = mock.history.post[0];
      expect(loginRequest).toBeDefined();

      expect(JSON.parse(loginRequest.data)).toEqual({
        username: email,
        // tslint:disable-next-line:no-hardcoded-credentials
        password: 'secret',
        remember
      });
    }
  );
});
