import { Action } from '@ngrx/store'
import { LoginUser, RegisterUser, User } from '../models/user.models';

export const BOOK = '[USER] Book';
export const BOOK_SUCCESS = '[USER] Book success';
export const BOOK_FAILURE = '[USER] Book failure';

export class Book implements Action {
  readonly type = BOOK;

  constructor(public payload: User) { }
}
export class BookSuccess implements Action {
  readonly type = BOOK_SUCCESS;

  constructor(public id: string, public changes: Partial<User>) { }
}

export class BookFailure implements Action {
  readonly type = BOOK_FAILURE;

  constructor(public payload: string) { }
}

export type Actions = Book | BookSuccess | BookFailure;