import { renderInApp, RenderInAppResult } from 'App/test/renderInApp';
import * as React from 'react';
import 'react-testing-library/cleanup-after-each';
import { tick } from 'App/test/util/tick';
import { UserApiMock } from '../../../api/User/User.mock';
import { UserMapper } from '../../../api/User/User.mapper';
import { UserCardPure } from './UserCard';

describe('User profile card', () => {
  let rendered: RenderInAppResult;

  it('should have correct user info for not sub broker user', async () => {
    rendered = renderInApp(<UserCardPure user={UserMapper.fromDto(UserApiMock.ADMIN)} />);

    expect(rendered.getByText('Name')).toBeTruthy();
    expect(rendered.getByText('Username')).toBeTruthy();
    expect(rendered.getByText('Company')).toBeTruthy();
    expect(rendered.getByText('User role')).toBeTruthy();
    expect(rendered.getByText('Time Zone')).toBeTruthy();
    expect(rendered.getByText('Language')).toBeTruthy();
    expect(rendered.getByText('Country')).toBeTruthy();
    expect(rendered.getByText('Date Format')).toBeTruthy();
    expect(rendered.getByText('Time Format')).toBeTruthy();
    await tick();
    expect(rendered.getByText('Robert DeFoe')).toBeTruthy();
    expect(rendered.getByText('admin@example.com')).toBeTruthy();
    expect(rendered.getByText('AEGIS London')).toBeTruthy();
    expect(rendered.getByText('Admin')).toBeTruthy();
    expect(rendered.getByText('UTC')).toBeTruthy();
    expect(rendered.getByText('English')).toBeTruthy();
    expect(rendered.getByText('United Kingdom')).toBeTruthy();
    expect(rendered.getByText('05/09/2018 -- UK Short Date')).toBeTruthy();
    expect(rendered.getByText('21:48:32 -- 24-hour clock including seconds')).toBeTruthy();
  });
});
