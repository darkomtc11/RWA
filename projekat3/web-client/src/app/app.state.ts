import { Test } from './models/test.models';
import { User } from './models/user.models';
import { TestState } from './reducers/test.reducer';
import { AuthState } from './reducers/auth.reducer';

export interface AppState {
  readonly test: TestState
  readonly auth: AuthState
}