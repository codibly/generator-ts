import { createValidator } from 'revalidate';

const urlRegexp = /^http(s)?:\/\/[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export const isUrl = createValidator(
  (message) => (value) => {
    if (value === '' || typeof value !== 'string' || !urlRegexp.test(value)) {
      return message;
    }
  },
  'Invalid url'
);
