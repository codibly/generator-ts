import { RouterState } from 'connected-react-router';
import memoize from 'fast-memoize';
import { parse as parseQuery } from 'qs';
import { match, matchPath } from 'react-router';
import { createSelector } from 'reselect';

type RouterStateAware = {
  router?: RouterState;
  [key: string]: any;
};

export function getRouter(state?: RouterStateAware): RouterState | undefined {
  return (state && state.router) || undefined;
}

export const getLocation = createSelector(
  getRouter,
  (router) => (router && router.location) || undefined
);

export const getLocationPath = createSelector(
  getLocation,
  (location) => (location && location.pathname) || undefined
);

export const getLocationPathDecoded = createSelector(
  getLocationPath,
  (path) => (path ? decodeURIComponent(path) : undefined)
);

export const getQueryString = createSelector(
  getLocation,
  (location) => {
    let queryString = (location && location.search) || '';
    if (queryString.startsWith('?')) {
      queryString = queryString.substring(1);
    }

    return queryString;
  }
);

export const getQueryParams = createSelector(
  getQueryString,
  (queryString) => parseQuery(queryString)
);

export const getQueryParam = memoize((param: string) =>
  createSelector(
    getQueryParams,
    (params) => params[param]
  )
);

export const getQueryParamForMatch = memoize(
  (param: string, ...routes: string[]) =>
    createSelector(
      getQueryParams,
      getMatch(...routes),
      (params, aMatch) => (aMatch ? params[param] : undefined)
    ),
  {
    strategy: memoize.strategies.variadic
  }
);

export const getQueryParamForExactMatch = memoize(
  (param: string, ...routes: string[]) =>
    createSelector(
      getQueryParams,
      getExactMatch(...routes),
      (params, aMatch) => (aMatch ? params[param] : undefined)
    ),
  {
    strategy: memoize.strategies.variadic
  }
);

export const getMatch = memoize(
  (...routes: string[]) =>
    createSelector(
      getLocationPath,
      (currentPath) =>
        currentPath
          ? routes.reduce(
              (aMatch: null | match<any>, route) =>
                aMatch || matchPath<any>(currentPath, { path: route, exact: false }),
              null
            )
          : null
    ),
  {
    strategy: memoize.strategies.variadic
  }
);

export const getExactMatch = memoize(
  (...routes: string[]) =>
    createSelector(
      getLocationPath,
      (currentPath) =>
        currentPath
          ? routes.reduce(
              (aMatch: null | match<any>, route) =>
                aMatch || matchPath<any>(currentPath, { path: route, exact: true }),
              null
            )
          : null
    ),
  {
    strategy: memoize.strategies.variadic
  }
);

export const hasMatch = memoize(
  (...routes: string[]) =>
    createSelector(
      getMatch(...routes),
      (aMatch) => !!aMatch
    ),
  {
    strategy: memoize.strategies.variadic
  }
);

export const hasExactMatch = memoize(
  (...routes: string[]) =>
    createSelector(
      getExactMatch(...routes),
      (aMatch) => !!aMatch
    ),
  {
    strategy: memoize.strategies.variadic
  }
);

export const hasPathMatch = memoize(
  (...paths: string[]) =>
    createSelector(
      getLocationPathDecoded,
      (currentPath) => (currentPath ? paths.some((path) => currentPath.indexOf(path) === 0) : false)
    ),
  {
    strategy: memoize.strategies.variadic
  }
);

export const hasPathExactMatch = memoize(
  (...paths: string[]) =>
    createSelector(
      getLocationPathDecoded,
      (currentPath) => (currentPath ? paths.some((path) => path === currentPath) : false)
    ),
  {
    strategy: memoize.strategies.variadic
  }
);
