import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';

import * as FlightActions from './../actions/flight.actions'
import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight.models';


@Injectable()
export class FlightEffects {

  constructor(
    private _actions: Actions,
    private _flight: FlightService,
    private _router: Router,
  ) { }

  @Effect()
  Add: Observable<FlightActions.AddSuccess | FlightActions.AddFailure> = this._actions.pipe(ofType(FlightActions.ADD), map((action: FlightActions.Add) => action.payload), switchMap(payload => {
    console.log(payload);
    return this._flight.add(payload).pipe(map(flight => {
      console.log(flight);
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

}