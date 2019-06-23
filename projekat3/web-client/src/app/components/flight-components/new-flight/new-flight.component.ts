import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as FlightActions from '../../../actions/flight.actions'
import { Flight, eClassType } from 'src/app/models/flight.models';

@Component({
  selector: 'app-new-flight',
  templateUrl: './new-flight.component.html',
  styleUrls: ['./new-flight.component.sass']
})
export class NewFlightComponent implements OnInit {

  newFlightForm: FormGroup;
  showInvalid: boolean = false;
  errorMessage: string ='';

  constructor(
    private _store: Store<AppState>,
    private _fb: FormBuilder
  ) {
  }

  get airline() {
    return this.newFlightForm.get('airline');
  }

  get from() {
    return this.newFlightForm.get('from');
  }

  get to() {
    return this.newFlightForm.get('to');
  }

  get firstClassSeats() {
    return this.newFlightForm.get('firstClassSeats');
  }

  get businessClassSeats() {
    return this.newFlightForm.get('businessClassSeats');
  }

  get premiumClassSeats() {
    return this.newFlightForm.get('premiumClassSeats');
  }

  get economyClassSeats() {
    return this.newFlightForm.get('economyClassSeats');
  }
  
  get date() {
    return this.newFlightForm.get('date');
  }

  get hours() {
    return this.newFlightForm.get('hours');
  }

  get minutes() {
    return this.newFlightForm.get('minutes');
  }


  ngOnInit() {
    this.newFlightForm = this._fb.group(
      {
        airline: [
          '',
          [Validators.required]
        ],
        from: [
          '',
          [Validators.required]
        ], 
        to: [
          '',
          [Validators.required]
        ], 
        firstClassSeats: [
          0,
          [Validators.required]
        ], 
        businessClassSeats: [
          0,
          [Validators.required]
        ], 
        premiumClassSeats: [
          0,
          [Validators.required]
        ], 
        economyClassSeats: [
          0,
          [Validators.required]
        ], 
        date: [
          null,
          [Validators.required]
        ],
        hours: [
          0,
          [Validators.required, Validators.min(0), Validators.max(24)]
        ],
        minutes: [
          0,
          [Validators.required, Validators.min(0), Validators.max(60)]
        ],
      });
  }

  showInvalidFields() {
    this.showInvalid = true;
  }

  onSubmit(): void {

    let date: Date = this.date.value;
    date.setHours(this.hours.value);
    date.setMinutes(this.minutes.value);

    let flight: Partial<Flight>={
      airline:this.airline.value,
      from: this.from.value,
      to:this.to.value,
      seats:[
        {number:this.firstClassSeats.value,type:eClassType.first},
        {number:this.businessClassSeats.value,type:eClassType.business},
        {number:this.premiumClassSeats.value,type:eClassType.premium},
        {number:this.economyClassSeats.value,type:eClassType.economy}
      ],
      date: date
    }

    this._store.dispatch(new FlightActions.Add(flight));
  }

}
