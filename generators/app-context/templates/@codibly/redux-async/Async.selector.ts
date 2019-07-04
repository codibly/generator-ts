import memoize from 'fast-memoize';
import { createSelector } from 'reselect';
import { AsyncMountedState, AsyncState, AsyncStatus } from './Async.state';

export namespace AsyncSelector {
  const getAsyncDomain = (state: AsyncMountedState) => state.async || ({} as AsyncState);

  const getStatusMap = createSelector(
    getAsyncDomain,
    (state) => state.status || {}
  );

  const getTimestampMap = createSelector(
    getAsyncDomain,
    (state) => state.timestamp || {}
  );

  export const getStatus = memoize((name: string) =>
    createSelector(
      getStatusMap,
      (statuses) => statuses[name] || AsyncStatus.VOID
    )
  );

  export const getTimestamp = memoize((name: string) =>
    createSelector(
      getTimestampMap,
      (timestamps) => timestamps[name] || undefined
    )
  );

  export const isVoid = memoize((name: string) =>
    createSelector(
      getStatus(name),
      (status) => status === AsyncStatus.VOID
    )
  );
  export const isPending = memoize((name: string) =>
    createSelector(
      getStatus(name),
      (status) => status === AsyncStatus.PENDING
    )
  );
  export const isResolved = memoize((name: string) =>
    createSelector(
      getStatus(name),
      (status) => status === AsyncStatus.RESOLVED
    )
  );
  export const isRejected = memoize((name: string) =>
    createSelector(
      getStatus(name),
      (status) => status === AsyncStatus.REJECTED
    )
  );
}
