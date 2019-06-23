import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/models/flight.models';
import { Store } from '@ngrx/store';
import { FlightState } from 'src/app/reducers/flight.reducer';
import * as flight from 'src/app/reducers/flight.reducer';
import * as flightActions from 'src/app/actions/flight.actions';
@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.sass']
})
export class FlightListComponent implements OnInit {

  flights: Observable<Flight[]>

  constructor(private _store: Store<FlightState>) {
    _store.dispatch(new flightActions.Fetch());
  }

  ngOnInit() {
    this.flights = this._store.select(flight.selectAll);
  }

}
