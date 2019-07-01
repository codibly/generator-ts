import { Info } from 'App/component/Info/Info';
import * as React from 'react';
import { Role } from '../../../model/Role';
import { User } from '../../../model/User';

export namespace UserCardData {
  export function info(user: User): Info.Row[] {
    return [
      {
        label: 'Name',
        value: User.getName(user)
      },
      {
        label: 'Username',
        value: user.email
      },
      {
        label: 'User role',
        value: Role.getLabel(user.role)
      },
    ];
  }
}
