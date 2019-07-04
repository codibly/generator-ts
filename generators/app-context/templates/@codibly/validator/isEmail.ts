import { createValidator } from 'revalidate';

// split email regexp for better performance
const userRegexp = /^\w+([.-]\w+)*$/;
const domainRegexp = /^\w+([.-]\w+)*\.[a-z]{2,4}$/;

export const isEmail = createValidator(
  (message) => (value) => {
    if (value === '' || typeof value !== 'string') {
      return message;
    }

    const segments = value.split('@');

    if (segments.length !== 2 || !userRegexp.test(segments[0]) || !domainRegexp.test(segments[1])) {
      return message;
    }
  },
  'Invalid email address'
);
