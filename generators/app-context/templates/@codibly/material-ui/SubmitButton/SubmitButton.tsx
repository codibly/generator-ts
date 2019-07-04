import { connect } from 'formik';
import * as React from 'react';
import { AsyncButton } from '../AsyncButton/AsyncButton';

export namespace SubmitButton {
  export type Props = AsyncButton.Props;
}

export const SubmitButton = connect<SubmitButton.Props>(({ formik, onClick, ...props }) => {
  if (!formik || !formik.submitForm) {
    throw new Error('<SubmitButton/> must be rendered inside <Formik/> component.');
  }

  return (
    <AsyncButton
      {...props}
      type="submit"
      pending={props.pending || formik.isSubmitting}
      onClick={(event) => {
        if (onClick) {
          onClick(event);
        }

        if (formik && formik.submitForm) {
          // set timeout due to IE-11 error - need to press enter twice for submitting form
          setTimeout(() => {
            formik.submitForm();
          }, 0);
        }
      }}
    />
  );
});
