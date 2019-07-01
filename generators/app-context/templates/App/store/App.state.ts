import { SnackbarState } from '@rebean/snackbar';
import { AuthState } from 'Auth/store/Auth/Auth.state';
import { RouterState } from 'connected-react-router';
import { AsyncState } from '@codibly/redux-async/Async.state';
import { DialogState } from '@codibly/redux-dialog/Dialog.state';
import {UserState} from "User/store/User/User.state";

export type AppState = {
  async: AsyncState;
  router: RouterState;
  snackbar: SnackbarState;
  auth: AuthState;
  dialog: DialogState;
  user: UserState;
}
