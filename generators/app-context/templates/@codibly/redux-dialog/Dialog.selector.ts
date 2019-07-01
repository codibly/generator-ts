import memoize from 'fast-memoize';
import { createSelector, Selector } from 'reselect';
import { DialogMountedState, DialogState } from './Dialog.state';

export namespace DialogSelector {
  const getDomain: Selector<DialogMountedState, DialogState> = (state) =>
    (state && state.dialog) || null;

  export const getDialogName = createSelector(
    getDomain,
    (dialog) => dialog && dialog.name
  );

  export const getDialogParams = memoize((dialogName: string) =>
    createSelector(
      getDomain,
      (dialog) =>
        dialog && dialog.name === dialogName ? ((dialog.params || {}) as any) : ({} as any)
    )
  );

  export const getDialogParam = memoize((dialogName: string, paramName: string) =>
    createSelector(
      getDialogParams(dialogName),
      (params) => params[paramName]
    )
  );

  export const isDialogOpen = memoize((dialogName: string) =>
    createSelector(
      getDialogName,
      (currentDialogName) => currentDialogName === dialogName
    )
  );

  export const isDialogClosed = memoize((dialogName: string) =>
    createSelector(
      isDialogOpen(dialogName),
      (isOpen) => !isOpen
    )
  );
}
