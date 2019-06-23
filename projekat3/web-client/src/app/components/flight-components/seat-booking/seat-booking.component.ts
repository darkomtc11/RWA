import { Component, OnInit, Input } from '@angular/core';
import { Flight, eClassType, Booking } from 'src/app/models/flight.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user.models';
import * as flight from 'src/app/reducers/flight.reducer';
import * as flightActions from 'src/app/actions/flight.actions';
import * as userActions from 'src/app/actions/user.actions';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.sass']
})
export class SeatBookingComponent implements OnInit {

  @Input() flight: Flight;
  @Input() type: eClassType;
  @Input() user: User;
  @Input() max: number;
  showInvalid:boolean=false;
  bookingForm: FormGroup;

  constructor(private _fb: FormBuilder, private _store: Store<AppState>) { }

  ngOnInit() {
    this.bookingForm = this._fb.group(
      {
        number: [
          0,
          [Validators.min(1), Validators.max(this.max)]
        ]
      });
  }

  get number() {
    return this.bookingForm.get("number");
  }

  showInvalidFields(){
    this.showInvalid = true;
  }

  onSubmit() {
    console.log(this.flight);
    let booking: Booking = { flightId: this.flight.id, seats: { number: this.number.value, type: this.type } };
    this.flight.seats[booking.seats.type].number -= booking.seats.number;
    this._store.dispatch(new flightActions.Book(this.flight));

    this.user.bookedFlights.push(booking);
    this._store.dispatch(new userActions.Book(this.user));
  }

}
