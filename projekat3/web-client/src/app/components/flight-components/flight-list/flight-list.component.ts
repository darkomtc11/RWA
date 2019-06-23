import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/models/flight.models';
import { Store } from '@ngrx/store';
import { FlightState } from 'src/app/reducers/flight.reducer';
import * as flight from 'src/app/reducers/flight.reducer';
import * as flightActions from 'src/app/actions/flight.actions';
import { AuthState } from 'src/app/reducers/auth.reducer';
import { User } from 'src/app/models/user.models';
@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.sass']
})
export class FlightListComponent implements OnInit {

  @Input() flights: Flight[];
  @Input() authState: AuthState;

  constructor() {
  }

  ngOnInit() {
    
  }

}
