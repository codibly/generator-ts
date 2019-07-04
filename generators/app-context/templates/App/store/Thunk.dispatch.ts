import { AnyAction } from 'redux';
import { ThunkDispatch as OriginThunkDispatch } from 'redux-thunk';
import { AppState } from './App.state';

export type ThunkDispatch = OriginThunkDispatch<AppState, void, AnyAction>;
