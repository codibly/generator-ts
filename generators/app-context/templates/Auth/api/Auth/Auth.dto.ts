import { UserDto } from 'User/api/User/User.dto';

export namespace AuthDto {
  export type Login = {
    username: string;
    password: string;
    remember?: boolean;
  };
  export type Myself = UserDto.Get;
  export type ResetPasswordRequest = {
    email: string;
  };
  export type ResetPassword = {
    new: string;
  };

  export type ChangePassword = {
    current: string;
    new: string;
  };
}
