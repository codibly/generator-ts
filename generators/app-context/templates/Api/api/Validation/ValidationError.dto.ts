import { ErrorCode } from '../../model/ErrorCode';
import { ApiDto } from '../../api/Api.dto';

export type ValidationErrorDto = ApiDto.ErrorResponse<ErrorCode.VALIDATION_FAILED> & {
  violations: ValidationErrorDto.Violation[];
};

export namespace ValidationErrorDto {
  export function isValidationError(
    error: ApiDto.ErrorResponse | undefined
  ): error is ValidationErrorDto {
    return !!error && error.errorCode === ErrorCode.VALIDATION_FAILED;
  }

  export type Violation = {
    message: string;
    property: string;
    meta?: ViolationMeta;
  };

  export type ViolationMeta = {
    template: string;
    params: {
      [key: string]: string;
    };
  };
}
