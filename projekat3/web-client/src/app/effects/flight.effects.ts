import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

import * as FlightActions from './../actions/flight.actions'
import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight.models';
import { UserService } from '../services/user.service';


@Injectable()
export class FlightEffects {

  constructor(
    private _actions: Actions,
    private _flight: FlightService,
    private _user: UserService,
    private _router: Router,
  ) { }

  @Effect()
  Add: Observable<FlightActions.AddSuccess | FlightActions.AddFailure> = this._actions.pipe(ofType(FlightActions.ADD), map((action: FlightActions.Add) => action.payload), switchMap(payload => {
    return this._flight.add(payload).pipe(map(flight => {
      if (typeof (flight) === "string") {
        return new FlightActions.AddFailure(flight as string);
      }
      else {
        return new FlightActions.AddSuccess(flight as Flight);
      }
    }));
  }));

  @Effect()
  Fetch: Observable<FlightActions.FetchSuccess | FlightActions.FetchFailure> = this._actions.pipe(ofType(FlightActions.FETCH), switchMap(() => {
    return this._flight.get().pipe(map(flights => {
      if (flights) {
        return new FlightActions.FetchSuccess(flights);
      }
      else {
        return new FlightActions.FetchFailure('No flights found.');
      }
    }))
  }));

  @Effect()
  Book: Observable<FlightActions.BookSuccess | FlightActions.BookFailure> = this._actions.pipe(ofType(FlightActions.BOOK), map((action: FlightActions.Book) => action.payload), switchMap(payload => {
    return this._flight.update(payload).pipe(map(res => {
      if (typeof (res) === "string") {
        return new FlightActions.BookFailure(res as string);
      }
      else {
        return new FlightActions.BookSuccess(payload.id, payload);
      }
    }));
  }));
}