import { User } from '../models/user.models';
import * as AuthActions from './../actions/auth.actions'

export interface State {
  isLoggedIn: boolean;
  user: User;
  loginErrorMessage: string;
}

const initialState: State = {
  isLoggedIn: false,
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email:'',
    username: ''
  },
  loginErrorMessage: ''
}

export function authReducer(state: State = initialState, action: AuthActions.Actions) {
  switch (action.type) {
    case AuthActions.LOGIN:
      return ;
    case AuthActions.REGISTER:
      return;
      case AuthActions.CHECK:
        return;
    default:
      return state;
  }
}