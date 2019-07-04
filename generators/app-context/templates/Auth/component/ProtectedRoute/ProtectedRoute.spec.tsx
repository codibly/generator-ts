import { History } from 'history';
import { createMemoryHistory } from 'history';
import * as React from 'react';
import { ReactElement } from 'react';
import { Route, Router, Switch } from 'react-router';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import { AuthStatus } from '../../model/AuthStatus';
import { ProtectedRouteDumb } from './ProtectedRoute';

describe('ProtectedRoute', () => {
  let renderInRouter: (ui: ReactElement<any>) => RenderResult & { history: History };

  beforeEach(() => {
    renderInRouter = (ui) => {
      const history = createMemoryHistory();

      return {
        ...render(<Router history={history}>{ui}</Router>),
        history
      };
    };
  });

  it('should render content for authenticated status', () => {
    const { history, getByText, queryByText } = renderInRouter(
      <Switch>
        <Route path="/another" component={() => <div>From another route</div>} />
        <ProtectedRouteDumb
          path="/test"
          component={() => <div>Yee! I'm authenticated</div>}
          status={AuthStatus.AUTHENTICATED}
        />
      </Switch>
    );

    history.push('/another');

    expect(getByText('From another route')).toBeDefined();
    expect(queryByText("Yee! I'm authenticated")).toBe(null);

    history.push('/test');

    expect(queryByText('From another route')).toBe(null);
    expect(getByText("Yee! I'm authenticated")).toBeDefined();
  });

  it('should render content for unknown status', () => {
    const { history, getByText, queryByText } = renderInRouter(
      <ProtectedRouteDumb
        path="/test"
        component={() => <div>I'm authenticated but it shouldn't be visible</div>}
        unknown={<div>Unknown status - should be visible now</div>}
        status={AuthStatus.UNKNOWN}
      />
    );

    history.push('/test');

    expect(getByText('Unknown status - should be visible now')).toBeDefined();
    expect(queryByText("I'm authenticated but it shouldn't be visible")).toBe(null);
  });

  it('should render content for not authenticated status', () => {
    const { history, getByText, queryByText } = renderInRouter(
      <ProtectedRouteDumb
        path="/test"
        component={() => <div>I'm authenticated but it shouldn't be visible</div>}
        notAuthenticated={<div>Not authenticated - should be visible now</div>}
        status={AuthStatus.NOT_AUTHENTICATED}
      />
    );

    history.push('/test');

    expect(getByText('Not authenticated - should be visible now')).toBeDefined();
    expect(queryByText("I'm authenticated but it shouldn't be visible")).toBe(null);
  });
});
