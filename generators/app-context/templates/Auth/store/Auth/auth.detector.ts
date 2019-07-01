import { changedToTruthy, composeDetectors, conditionDetector } from 'redux-detector';
import { AuthAction } from './Auth.action';
import { AuthSelector } from './Auth.selector';

const initialCheckMyselfDetector = conditionDetector(changedToTruthy(AuthSelector.isMounted), () =>
  AuthAction.checkMyself()
);

const checkMyselfDetector = conditionDetector(changedToTruthy(AuthSelector.isAuthenticated), () =>
  AuthAction.checkMyselfIfUnknown()
);

const accessLoginRouteDetector = conditionDetector(
  changedToTruthy(AuthSelector.isAuthenticated),
  () => AuthAction.redirectToDashboardIfAuthenticated()
);

const accessDashboardRouteDetector = conditionDetector(
  changedToTruthy(AuthSelector.isNotAuthenticated),
  () => AuthAction.redirectToLoginIfNotAuthenticated()
);

export const authDetector = composeDetectors(
  initialCheckMyselfDetector,
  checkMyselfDetector,
  accessLoginRouteDetector,
  accessDashboardRouteDetector
);
