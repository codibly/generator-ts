import { renderInApp, RenderInAppResult } from 'App/test/renderInApp';
import * as React from 'react';
import { fireEvent } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { ExpiredTokenPageDumb } from './ExpiredTokenPage';

describe('Expired token page', () => {
  let rendered: RenderInAppResult;
  let onRecoverPassword: jest.Mock;
  let recoveryButton: HTMLElement;

  beforeEach(() => {
    onRecoverPassword = jest.fn();

    rendered = renderInApp(<ExpiredTokenPageDumb onRecoverPassword={onRecoverPassword} />);
  });

  it('should have correct button label', async () => {
    const { getByText } = rendered;

    recoveryButton = getByText('Reset password page');
    expect(recoveryButton).toBeTruthy();
  });

  it('should redirect to forgotten password page', async () => {
    const { getByText } = rendered;

    recoveryButton = getByText('Reset password page');
    expect(recoveryButton).toBeTruthy();

    fireEvent.click(recoveryButton);
    expect(onRecoverPassword).toBeCalled();
  });
});
