import { ErrorCode } from '../../model/ErrorCode';
import { ApiDto } from '../Api.dto';

export type BadRequestErrorDto = ApiDto.ErrorResponse<ErrorCode.BAD_REQUEST>;

export namespace BadRequestErrorDto {
  export function isBadRequestError(
    error: ApiDto.ErrorResponse | undefined
  ): error is BadRequestErrorDto {
    return !!error && error.errorCode === ErrorCode.BAD_REQUEST;
  }
}
