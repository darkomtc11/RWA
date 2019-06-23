import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Flight, eClassType } from 'src/app/models/flight.models';
import * as flight from 'src/app/reducers/flight.reducer';
import * as flightActions from 'src/app/actions/flight.actions';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup;

  get from() {
    return this.searchForm.get('from');
  }

  get to() {
    return this.searchForm.get('to');
  }

  get firstClass() {
    return this.searchForm.get('firstClass');
  }

  get businessClass() {
    return this.searchForm.get('businessClass');
  }

  get premiumClass() {
    return this.searchForm.get('premiumClass');
  }

  get economyClass() {
    return this.searchForm.get('economyClass');
  }

  authObs: Observable<AuthState>;
  flightObs: Observable<Flight[]>;

  constructor(private _store: Store<AppState>, private _fb: FormBuilder) {
    _store.dispatch(new flightActions.Fetch());
    this.authObs = _store.select('auth');
    this.flightObs = _store.select(flight.selectFiltered);
  }

  ngOnInit() {
    this.searchForm = this._fb.group(
      {
        from: [
          ''
        ],
        to: [
          ''
        ],
        firstClass: [false],
        businessClass: [false],
        premiumClass: [false],
        economyClass: [false]
      });
  }

  onSubmit() {
    let classes: eClassType[] = [];
    if (this.firstClass.value)
      classes.push(eClassType.first)
    if (this.businessClass.value)
      classes.push(eClassType.business)
    if (this.premiumClass.value)
      classes.push(eClassType.premium)
    if (this.economyClass.value)
      classes.push(eClassType.economy)

    this._store.dispatch(new flightActions.Filter({ from: this.from.value, to: this.to.value, classes: classes }))
  }

}
