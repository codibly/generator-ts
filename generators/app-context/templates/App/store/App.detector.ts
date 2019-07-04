import { authDetector } from 'Auth/store/Auth/Auth.detector';
import { userDetector } from 'User/store/User/User.detector';

import { composeDetectors } from 'redux-detector';

export const appDetector = composeDetectors(
  authDetector,
  userDetector
);
