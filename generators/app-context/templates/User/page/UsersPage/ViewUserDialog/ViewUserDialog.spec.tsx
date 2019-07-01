import { http } from 'Api';
import { DialogAction } from '@codibly/redux-dialog/Dialog.action';
import { renderInApp, RenderInAppResult } from 'App/test/renderInApp';
import { tick } from 'App/test/util/tick';
import MockAdapter from 'axios-mock-adapter';
import { DateTime, Duration } from 'luxon';
import * as React from 'react';
import { UserApiMock } from '../../../api/User/User.mock';
import { UserMapper } from '../../../api/User/User.mapper';
import { VIEW_USER_DIALOG, ViewUserDialog } from './ViewUserDialog';

describe('<ViewUserDialog />', () => {
  const mock = new MockAdapter(http);
  let rendered: RenderInAppResult;

  beforeEach(() => {
    mock.reset();

    rendered = renderInApp(<ViewUserDialog />);
  });

  it("should display user's information", async () => {
    const user = UserMapper.fromDto(UserApiMock.ADMIN);
    const { store, getByText } = rendered;
    store.dispatch(DialogAction.openDialog(VIEW_USER_DIALOG, { user }));

    await tick();

    expect(getByText('Robert DeFoe')).toBeDefined();
    expect(getByText('admin@example.com')).toBeDefined();
    expect(getByText('AEGIS London')).toBeDefined();
    expect(getByText('Admin')).toBeDefined();
    expect(getByText('UTC')).toBeDefined();
    expect(getByText('English')).toBeDefined();
    expect(getByText('United Kingdom')).toBeDefined();
    expect(getByText('05/09/2018 -- UK Short Date')).toBeDefined();
    expect(getByText('21:48:32 -- 24-hour clock including seconds')).toBeDefined();
    expect(getByText('Enabled')).toBeDefined();
  });

  it('should display indirectly disabled info', async () => {
    const user = {
      ...UserMapper.fromDto(UserApiMock.ADMIN),
      endDate: DateTime.local().minus(Duration.fromISO('P1Y'))
    };

    const { store, getByText } = rendered;
    store.dispatch(DialogAction.openDialog(VIEW_USER_DIALOG, { user }));

    await tick();

    expect(getByText('Disabled')).toBeDefined();
    expect(getByText('Temporarily disabled because of the start/end date settings')).toBeDefined();
  });
});
