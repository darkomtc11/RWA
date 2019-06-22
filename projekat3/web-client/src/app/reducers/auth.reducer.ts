import { User } from '../models/user.models';
import * as AuthActions from './../actions/auth.actions'

export interface AuthState {
  isLoggedIn: boolean;
  user: User;
  errorMessage: string;
  showInvalid: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: ''
  },
  errorMessage: '',
  showInvalid: false
}

export function authReducer(state: AuthState = initialState, action: AuthActions.Actions) {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      action.payload["password"] = undefined;
      return { ...state, isLoggedIn: true, user: action.payload, errorMessage: '', showInvalid: false };

    case AuthActions.LOGIN_FAILURE:
      return { ...state, ...initialState, errorMessage: action.payload, showInvalid: true };

    case AuthActions.REGISTER_SUCCESS:
      action.payload["password"] = undefined;
      return { ...state, isLoggedIn: true, user: action.payload, errorMessage: '', showInvalid: false };

    case AuthActions.REGISTER_FAILURE:
      return { ...state, ...initialState, errorMessage: action.payload, showInvalid: true };

    case AuthActions.CHECK_SUCCESS:
      action.payload["password"] = undefined;
      return { ...state, isLoggedIn: true, user: action.payload, errorMessage: '', showInvalid: false };

    case AuthActions.LOGOUT:
    case AuthActions.CHECK_FAILURE:
      localStorage.removeItem("token");
      return { ...state, ...initialState };

    case AuthActions.RESET_ERROR_MESSAGE:
      return { ...state, errorMessage: '', showInvalid: false };

    case AuthActions.SHOW_INVALID:
      return { ...state, showInvalid: true };

    default:
      return state;
  }
}