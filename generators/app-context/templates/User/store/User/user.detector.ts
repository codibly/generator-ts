import { changedFilters } from 'Api/store/Filters/filters.detector';
import { changedPagination } from 'Api/store/Pagination/pagination.detector';
import { changedSorting } from 'Api/store/Sorting/sorting.detector';
import { DashboardRoute } from 'App/route/dashboard';
import { hasMatch } from '@codibly/router-selector/routerSelector';
import {
  changedToTruthy,
  composeAnd,
  composeOr,
  conditionDetector,
  isTruthy
} from 'redux-detector';
import { UserAction } from './User.action';
import { UserSelector } from './User.selector';

export const userDetector = conditionDetector(
  composeOr(
    changedToTruthy(hasMatch(DashboardRoute.USERS)),
    composeAnd(
      isTruthy(hasMatch(DashboardRoute.USERS)),
      composeOr(
        changedPagination(UserSelector.getPagination),
        changedFilters(UserSelector.getFilters),
        changedSorting(UserSelector.getSorting)
      )
    )
  ),
  () => UserAction.listUsers()
);
