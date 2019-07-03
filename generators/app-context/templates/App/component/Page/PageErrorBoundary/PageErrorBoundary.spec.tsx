import { muteErrors, unmuteErrors } from '@codibly/mute-errors';
import * as React from 'react';
import { renderInApp } from 'App/test/renderInApp';
import { tick } from '@codibly/test-utils';
import { PageErrorBoundary } from './PageErrorBoundary';

describe('PageErrorBoundary', () => {
  it('should render children if there is no error', () => {
    const { getByText } = renderInApp(<PageErrorBoundary>Test</PageErrorBoundary>);

    expect(getByText('Test')).toBeDefined();
  });

  it('should render error fallback if there is error', async () => {
    const ErrorComponent = () => {
      throw new Error();
    };

    muteErrors();
    const { getByText } = renderInApp(
      <PageErrorBoundary>
        <ErrorComponent />
      </PageErrorBoundary>
    );
    unmuteErrors();

    await tick();

    expect(getByText('Application error')).toBeDefined();
  });
});
