import { Action } from '@ngrx/store'
import { Flight, Seats, Filter as FilterModel, Booking } from '../models/flight.models';
import { Update } from '@ngrx/entity';

export const FETCH = '[FLIGHT] Fetch';
export const FETCH_SUCCESS = '[FLIGHT] Fetch success';
export const FETCH_FAILURE = '[FLIGHT] Fetch failure';
export const ADD = '[FLIGHT] Add';
export const ADD_SUCCESS = '[FLIGHT] Add success';
export const ADD_FAILURE = '[FLIGHT] Add failure';
export const REMOVE = '[FLIGHT] Remove';
export const REMOVE_SUCCESS = '[FLIGHT] Remove success';
export const REMOVE_FAILURE = '[FLIGHT] Remove failure';
export const BOOK = '[FLIGHT] Book';
export const BOOK_SUCCESS = '[FLIGHT] Book success';
export const BOOK_FAILURE = '[FLIGHT] Book failure';
export const FILTER = '[FLIGHT] Filter';

export class Fetch implements Action {
  readonly type = FETCH;
}

export class FetchSuccess implements Action {
  readonly type = FETCH_SUCCESS;

  constructor(public payload: Flight[]) { }
}

export class FetchFailure implements Action {
  readonly type = FETCH_FAILURE;

  constructor(public payload: string) { }
}

export class Add implements Action {
  readonly type = ADD;

  constructor(public payload: Flight) { }
}

export class AddSuccess implements Action {
  readonly type = ADD_SUCCESS;

  constructor(public payload: Flight) { }
}

export class AddFailure implements Action {
  readonly type = ADD_FAILURE;

  constructor(public payload: string) { }
}

export class Remove implements Action {
  readonly type = REMOVE;

  constructor(public payload: number) { }
}

export class RemoveSuccess implements Action {
  readonly type = REMOVE_SUCCESS;

  constructor(public payload: number) { }
}

export class RemoveFailure implements Action {
  readonly type = REMOVE_FAILURE;

  constructor(public payload: string) { }
}

export class Book implements Action {
  readonly type = BOOK;

  constructor(public payload: Booking) { }
}

export class BookSuccess implements Action {
  readonly type = BOOK_SUCCESS;

  constructor(public id: number, public changes: Partial<Flight>) { }
}

export class BookFailure implements Action {
  readonly type = BOOK_FAILURE;

  constructor(public payload: string) { }
}

export class Filter implements Action {
  readonly type = FILTER;

  constructor(public payload: FilterModel) { }
}


export type Actions = Fetch | FetchSuccess | FetchFailure
  | Add | AddSuccess | AddFailure
  | Remove | RemoveSuccess | RemoveFailure
  | Book | BookSuccess | BookFailure
  | Filter
  ;