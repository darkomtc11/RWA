import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Test } from '../../models/test.models';
import { AppState } from './../../app.state';
import * as TestActions from "./../../actions/test.actions"

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {

  tests: Observable<Test[]>;

  constructor(private store: Store<AppState>) {
    this.tests = store.select('test');
  }

  addTest(){
    this.store.dispatch(new TestActions.AddTest({foo:"test", bar:"test"}));
  }

  removeTest(index){
    this.store.dispatch(new TestActions.RemoveTest(index));
  }

  ngOnInit() { }

}
