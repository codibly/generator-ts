import { ErrorCode } from '../../model/ErrorCode';
import { ValidationErrorDto } from './ValidationError.dto';
import { ValidationErrorMapper } from './ValidationError.mapper';

// tslint:disable:no-duplicate-string
describe('ValidationErrorMapper', () => {
  it('should map nested errors', () => {
    const error: ValidationErrorDto = {
      errorCode: 'VALIDATION_FAILED' as ErrorCode.VALIDATION_FAILED,
      message: 'Validation failed',
      violations: [
        {
          message: 'This value \u0022suite\u0022 should not be null ',
          property: 'address.suite',
          meta: {
            template: 'This value {{ value }} should not be null ',
            params: {
              '{{ value }}': '\u0022suite\u0022'
            }
          }
        }
      ]
    };

    expect(ValidationErrorMapper.toFormErrors(error)).toMatchSnapshot();
  });

  it('should map nested sheet errors', () => {
    const error: ValidationErrorDto = {
      errorCode: 'VALIDATION_FAILED' as ErrorCode.VALIDATION_FAILED,
      message: 'Validation failed',
      violations: [
        {
          message: 'This value \u0022name\u0022 should not be null ',
          property: 'name',
          meta: {
            template: 'This value {{ value }} should not be null ',
            params: {
              '{{ value }}': '\u0022name\u0022'
            }
          }
        },
        {
          message: 'This value should be 0 or more.',
          property: 'sheet.D2',
          meta: {
            template: 'This value should be {{ limit }} or more.',
            params: {
              '{{ value }}': '-5000000',
              '{{ limit }}': '0'
            }
          }
        }
      ]
    };

    expect(ValidationErrorMapper.toFormErrorsWithSheetCells(error, ['sheet'])).toMatchSnapshot();
  });
});
