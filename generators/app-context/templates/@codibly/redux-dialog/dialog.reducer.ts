import { handleActions } from 'redux-actions';
import { DialogAction } from './Dialog.action';
import { DialogState } from './Dialog.state';

export const dialogReducer = handleActions<DialogState, any>(
  {
    [DialogAction.OPEN_DIALOG]: (state: DialogState, action: DialogAction.OpenDialogAction) =>
      action.payload || state,
    [DialogAction.UPDATE_DIALOG]: (state: DialogState, action: DialogAction.UpdateDialogAction) =>
      state && action.payload
        ? {
            name: state.name,
            params: action.payload.params
          }
        : state,
    [DialogAction.UPDATE_DIALOG_PARAM]: (
      state: DialogState,
      action: DialogAction.UpdateDialogParamAction
    ) =>
      state && action.payload
        ? {
            name: state.name,
            params: {
              ...(state.params || {}),
              [action.payload.param]: action.payload.value
            }
          }
        : state,
    [DialogAction.CLOSE_DIALOG]: () => null
  },
  DialogState.INITIAL
);
