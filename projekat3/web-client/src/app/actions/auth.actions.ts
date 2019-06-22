import { Action } from '@ngrx/store'
import { LoginUser, RegisterUser, User } from '../models/user.models';

export const LOGIN = '[AUTH] Login';
export const LOGIN_SUCCESS = '[AUTH] Login success';
export const LOGIN_FAILURE = '[AUTH] Login failure';
export const LOGOUT = '[AUTH] Logout';
export const REGISTER = '[AUTH] Register';
export const REGISTER_SUCCESS = '[AUTH] Register success';
export const REGISTER_FAILURE = '[AUTH] Register failure';
export const CHECK = '[AUTH] Check';
export const CHECK_SUCCESS = '[AUTH] Check success';
export const CHECK_FAILURE = '[AUTH] Check failure';
export const RESET_ERROR_MESSAGE = '[AUTH] Reset error message';
export const SHOW_INVALID = '[AUTH] Show invalid';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: LoginUser) { }
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: User) { }
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: string) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class Register implements Action {
  readonly type = REGISTER;

  constructor(public payload: RegisterUser) { }
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;

  constructor(public payload: User) { }
}

export class RegisterFailure implements Action {
  readonly type = REGISTER_FAILURE;

  constructor(public payload: string) { }
}

export class Check implements Action {
  readonly type = CHECK;

  constructor(public payload: string) { }
}

export class CheckSuccess implements Action {
  readonly type = CHECK_SUCCESS;

  constructor(public payload: User) { }
}

export class CheckFailure implements Action {
  readonly type = CHECK_FAILURE;

  constructor(public payload: string) { }
}

export class ResetErrorMessage implements Action {
  readonly type = RESET_ERROR_MESSAGE;
}

export class ShowInvalid implements Action {
  readonly type = SHOW_INVALID;
}
export type Actions = Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | Register
  | RegisterSuccess
  | RegisterFailure
  | Check
  | CheckSuccess
  | CheckFailure
  | ResetErrorMessage
  | ShowInvalid
  ;