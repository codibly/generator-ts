import { AnyAction } from 'redux';
import { ThunkAction as OriginThunkAction } from 'redux-thunk';
import { AppState } from './App.state';

export type ThunkAction<T> = OriginThunkAction<T, AppState, void, AnyAction>;
