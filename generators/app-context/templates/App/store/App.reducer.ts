import { asyncReducer } from '@codibly/redux-async';
import { dialogReducer } from '@codibly/redux-dialog/Dialog.reducer';
import { snackbarReducer } from '@rebean/snackbar';
import { authReducer } from 'Auth/store/Auth/Auth.reducer';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { AppState } from './App.state';
import {userReducer} from "User/store/User/User.reducer";

export function createAppReducer(history: History) {
  return combineReducers<AppState>({
    router: connectRouter(history) as any,
    async: asyncReducer,
    snackbar: snackbarReducer,
    auth: authReducer,
    dialog: dialogReducer,
    user: userReducer
  });
}
