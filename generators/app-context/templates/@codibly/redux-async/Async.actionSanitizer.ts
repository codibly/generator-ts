import { isActionAsync, isActionPending, isActionRejected, isActionResolved } from './Async.action';

/**
 * Marks async status in Redux Devtools - adds icon after action type
 */
function asyncActionStatusMarker(action: any): any {
  if (isActionPending(action)) {
    return { ...action, type: `${action.type} ●` };
  }
  if (isActionResolved(action)) {
    return { ...action, type: `${action.type} ✔︎️` };
  }
  if (isActionRejected(action)) {
    return { ...action, type: `${action.type} ✖︎` };
  }

  return action;
}

/**
 * Options for async action sanitizer for Redux Devtools
 */
export interface AsyncActionSanitizerOptions {
  markStatus?: boolean;
}

const defaultSanitizerOptions: AsyncActionSanitizerOptions = {
  markStatus: true
};

/**
 * Improves development experience by marking async actions in Redux Devtools.
 */
export function asyncActionSanitizer(options?: AsyncActionSanitizerOptions) {
  options = {
    ...defaultSanitizerOptions,
    ...(options || {})
  };

  return (action: any): any => {
    if (options!.markStatus) {
      action = asyncActionStatusMarker(action);
    }

    return action;
  };
}
