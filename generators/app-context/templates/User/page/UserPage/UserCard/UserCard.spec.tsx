import { renderInApp, RenderInAppResult } from 'App/test/renderInApp';
import * as React from 'react';
import '@testing-library/react/cleanup-after-each';
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
    expect(rendered.getByText('User role')).toBeTruthy();
    await tick();
    expect(rendered.getByText('Robert DeFoe')).toBeTruthy();
    expect(rendered.getByText('admin@example.com')).toBeTruthy();
    expect(rendered.getByText('Admin')).toBeTruthy();
  });
});
