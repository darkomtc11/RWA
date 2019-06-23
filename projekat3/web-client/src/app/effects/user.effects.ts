import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import * as UserActions from './../actions/user.actions'
import { User } from '../models/user.models';
import { UserService } from '../services/user.service';


@Injectable()
export class UserEffects {

  constructor(
    private _actions: Actions,
    private _user: UserService,
    private _router: Router,
  ) { }


  @Effect()
  Book: Observable<UserActions.BookSuccess | UserActions.BookFailure> = this._actions.pipe(ofType(UserActions.BOOK), map((action: UserActions.Book) => action.payload), switchMap(payload => {
    return this._user.update(payload).pipe(map(user => {
      if (typeof (user) === "string") {
        return new UserActions.BookFailure(user as string);
      }
      else {
        return new UserActions.BookSuccess(user.id, user);
      }
    }));
  }));

}