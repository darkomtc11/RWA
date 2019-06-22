import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import * as AuthActions from './../actions/auth.actions'
import { User } from '../models/user.models';


@Injectable()
export class AuthEffects {

  constructor(
    private _actions: Actions,
    private _auth: AuthService,
    private _router: Router,
  ) { }

  @Effect()
  Login: Observable<AuthActions.LoginSuccess | AuthActions.LoginFailure> = this._actions.pipe(ofType(AuthActions.LOGIN), map((action: AuthActions.Login) => action.payload), switchMap(payload => {
    return this._auth.login(payload).pipe(map(user => {
      if (user) {
        console.log(user);
        return new AuthActions.LoginSuccess(user);
      }
      else {
        return new AuthActions.LoginFailure('Incorrect username or password.');
      }
    }));
  }));

  @Effect({ dispatch: false })
  LoginSuccess: Observable<User> = this._actions.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.id);
      this._router.navigate(['']);
    })
  );

}