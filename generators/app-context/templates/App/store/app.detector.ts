import { authDetector } from 'Auth/store/Auth/auth.detector';
import { userDetector } from 'User/store/User/user.detector';

import { composeDetectors } from 'redux-detector';

export const appDetector = composeDetectors(
  authDetector,
  userDetector
);
