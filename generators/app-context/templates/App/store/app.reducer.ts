import { asyncReducer } from '@codibly/redux-async/async.reducer';
import { dialogReducer } from '@codibly/redux-dialog/dialog.reducer';
import { snackbarReducer } from '@rebean/snackbar';
import { authReducer } from 'Auth/store/Auth/auth.reducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { AppState } from './App.state';

export function createAppReducer(history: History) {
  return combineReducers<AppState>({
    router: connectRouter(history) as any,
    async: asyncReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
    dialog: dialogReducer
  });
}
