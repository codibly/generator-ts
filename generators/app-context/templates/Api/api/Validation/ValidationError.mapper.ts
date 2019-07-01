import { getIn, setIn } from 'formik';
import { ValidationErrorDto } from './ValidationError.dto';

export namespace ValidationErrorMapper {
  type FormErrors = {
    [field: string]: string | FormErrors;
  };

  /**
   * Transforms ValidationErrorDto to nested FormErrors object where:
   *  * key is a field name
   *  * value is a violation message or nested FormErrors object
   * If there are multiple violations that points at the same field, the strategy is to use the first one.
   *
   * @see ./ValidationErrorMapper.spec.tsx
   *
   * @param error
   */
  export function toFormErrors(error: ValidationErrorDto): FormErrors {
    return error.violations.reduce<FormErrors>(
      (formErrors, violation) =>
        // favor the first error (we assume that it's the most important one)
        getIn(formErrors, violation.property) === undefined
          ? setIn(formErrors, violation.property, violation.message)
          : formErrors,
      {}
    );
  }

  /**
   * Formats nested FormErrors object to a cell related error
   * @param errors
   */
  function formatSheetErrors(errors: FormErrors): string {
    return Object.keys(errors)
      .map((cell) => `Cell ${cell}: ${errors[cell]}`)
      .join('\n');
  }

  /**
   * Let's say we import spreadsheet using "indications" name in the request with invalid data in the A2 cell.
   * Backend will perform a validation and return ValidationErrorDto. This error will contain list of violations.
   * The goal of this function is to map violations with path like "indications.A2" to violations with path "indications"
   * and message "Cell A2: {violation.message}".
   *
   * @see ./ValidationErrorMapper.spec.tsx
   *
   * @param error
   * @param sheetFields List of fields that possibly contains sheet violations
   */
  export function toFormErrorsWithSheetCells(
    error: ValidationErrorDto,
    sheetFields: string[]
  ): FormErrors {
    const formErrors = toFormErrors(error);

    return Object.keys(formErrors).reduce<FormErrors>((errors, field) => {
      const isSheetField = sheetFields.includes(field);
      // toFormErrors already mapped it to nested FormErrors object
      const isSheetError = isSheetField && typeof formErrors[field] === 'object';

      const formattedError = isSheetError
        ? formatSheetErrors(formErrors[field] as FormErrors)
        : formErrors[field];

      return {
        ...errors,
        [field]: formattedError
      };
    }, {});
  }
}
