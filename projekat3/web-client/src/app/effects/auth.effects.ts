import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

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
      if (typeof (user) === "string") {
        return new AuthActions.LoginFailure(user as string);
      }
      else {
        return new AuthActions.LoginSuccess(user as User);
      }
    }));
  }));

  @Effect({ dispatch: false })
  LoginSuccess: Observable<AuthActions.LoginSuccess> = this._actions.pipe(
    ofType(AuthActions.LOGIN_SUCCESS),
    tap((action) => {
      console.log(action);
      localStorage.setItem('token', action.payload.id);
      this._router.navigate(['']);
    })
  );

  @Effect()
  Register: Observable<AuthActions.RegisterSuccess | AuthActions.RegisterFailure> = this._actions.pipe(ofType(AuthActions.REGISTER), map((action: AuthActions.Register) => action.payload), switchMap(payload => {
    console.log(payload);
    return this._auth.register(payload).pipe(map(user => {
      console.log(user);
      if (typeof (user) === "string") {
        return new AuthActions.RegisterFailure(user as string);
      }
      else {
        return new AuthActions.RegisterSuccess(user as User);
      }
    }));
  }));

  @Effect()
  Check: Observable<AuthActions.CheckSuccess | AuthActions.CheckFailure> = this._actions.pipe(ofType(AuthActions.CHECK), map((action: AuthActions.Check) => action.payload), switchMap(payload => {
    return this._auth.getById(payload).pipe(map(user => {
      if (user) {
        return new AuthActions.CheckSuccess(user);
      }
      else {
        return new AuthActions.CheckFailure('User not found.');
      }
    }))
  }));

}