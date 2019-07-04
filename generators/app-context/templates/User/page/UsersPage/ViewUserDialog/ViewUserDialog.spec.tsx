import { http } from 'Api';
import { DialogAction } from '@codibly/redux-dialog/Dialog.action';
import { renderInApp, RenderInAppResult } from 'App/test/renderInApp';
import { tick } from '@codibly/test-utils';
import MockAdapter from 'axios-mock-adapter';
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
    expect(getByText('Admin')).toBeDefined();
  });
});
