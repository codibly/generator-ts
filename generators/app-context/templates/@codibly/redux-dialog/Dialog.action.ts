import { Action } from 'redux-actions';

export namespace DialogAction {
  export const OPEN_DIALOG = 'OPEN_DIALOG';
  export type OpenDialogAction<P = {}> = Action<{ name: string; params: P }>;
  export const openDialog = <P = {}>(name: string, params: P = {} as P): OpenDialogAction<P> => ({
    type: OPEN_DIALOG,
    payload: { name, params }
  });

  export const UPDATE_DIALOG = 'UPDATE_DIALOG';
  export type UpdateDialogAction<P = {}> = Action<{ params: P }>;
  export const updateDialog = <P = {}>(params: P): UpdateDialogAction<P> => ({
    type: UPDATE_DIALOG,
    payload: { params }
  });

  export const UPDATE_DIALOG_PARAM = 'UPDATE_DIALOG_PARAM';
  export type UpdateDialogParamAction<P = any> = Action<{ param: string; value: P }>;
  export const updateDialogParam = <P = any>(
    param: string,
    value: P
  ): UpdateDialogParamAction<P> => ({
    type: UPDATE_DIALOG_PARAM,
    payload: { param, value }
  });

  export const CLOSE_DIALOG = 'CLOSE_DIALOG';
  export type CloseDialogAction = Action<void>;
  export const closeDialog = (): CloseDialogAction => ({
    type: CLOSE_DIALOG
  });

  export type Actions =
    | OpenDialogAction
    | UpdateDialogAction
    | UpdateDialogParamAction
    | CloseDialogAction;
}
