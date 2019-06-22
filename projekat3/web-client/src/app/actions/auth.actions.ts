import { Action } from '@ngrx/store'
import { Test } from '../models/test.models'
import { LoginUser, RegisterUser, User } from '../models/user.models';

export const LOGIN = '[AUTH] Login'
export const LOGIN_SUCCESS = '[AUTH] Login success'
export const LOGIN_FAILURE = '[AUTH] Login failure'
export const REGISTER = '[AUTH] Register'
export const REGISTER_SUCCESS = '[AUTH] Register success'
export const REGISTER_FAILUER = '[AUTH] Register failuer'
export const CHECK = '[AUTH] Check'

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

export class Register implements Action {
  readonly type = REGISTER;

  constructor(public payload: RegisterUser) { }
}

export class RegisterSuccess implements Action {
  readonly type = REGISTER_SUCCESS;

  constructor(public payload: User) { }
}

export class RegisterFailure implements Action {
  readonly type = REGISTER_FAILUER;

  constructor(public payload: string) { }
}

export class Check implements Action {
  readonly type = CHECK;

}

export type Actions = Login
  | LoginSuccess
  | LoginFailure
  | Register
  | RegisterSuccess
  | RegisterFailure
  | Check;