import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Test } from '../../models/test.models';
import { AppState } from './../../app.state';
import * as TestActions from "./../../actions/test.actions"
import { TestState } from 'src/app/reducers/test.reducer';
import { AuthState } from 'src/app/reducers/auth.reducer';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {

  testObs: Observable<TestState>;
  authObs: Observable<AuthState>;

  constructor(private store: Store<AppState>) {
    this.testObs = store.select('test');
    this.authObs = store.select('auth');
  }

  addTest(){
    this.store.dispatch(new TestActions.AddTest({foo:"test", bar:"test"}));
  }

  removeTest(index){
    this.store.dispatch(new TestActions.RemoveTest(index));
  }

  ngOnInit() { }

}
