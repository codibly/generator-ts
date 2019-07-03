import { http } from 'Api';
import { ApiMapper, QueryMapper, PaginatedResponse, Query } from '@codibly/redux-query';
import { User } from '../../model/User';
import { UserDto } from './User.dto';
import { UserMapper } from './User.mapper';

export namespace UserApi {
  export function list(query: Query = {}): Promise<PaginatedResponse<User>> {
    return http
      .get('/api/user', { params: QueryMapper.toDto(query) })
      .then(ApiMapper.mapPaginatedResponse(UserMapper.fromDto))
      .catch(ApiMapper.throwResponseError);
  }

  export function create(user: UserDto.Create): Promise<User> {
    return http
      .post('/api/user', user)
      .then(ApiMapper.mapData(UserMapper.fromDto))
      .catch(ApiMapper.throwResponseError);
  }

  export function update(user: UserDto.Update): Promise<User> {
    return http
      .post(`/api/user/${user.id}`, user)
      .then(ApiMapper.mapData(UserMapper.fromDto))
      .catch(ApiMapper.throwResponseError);
  }

  export function resendEmail(userId: string): Promise<any> {
    return http
      .post(`/api/user/${userId}/resend-welcome-email`)
      .catch(ApiMapper.throwResponseError);
  }
}
