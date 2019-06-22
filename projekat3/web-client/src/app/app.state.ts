import { Test } from './models/test.models';
import { User } from './models/user.models';
import * as test from "./reducers/test.reducer";
import * as auth from "./reducers/auth.reducer";

export interface AppState {
  readonly tests: test.State;
  readonly authState: auth.State
}