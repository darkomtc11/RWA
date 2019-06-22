import { Action } from '@ngrx/store'
import { Test } from '../models/test.models'
import * as TestActions from './../actions/test.actions'

export interface TestState {
  tests:Test[]
}

const initialState: TestState = {tests:[{
  foo: 'baz1',
  bar: 'baz1'
}, {
  foo: 'baz2',
  bar: 'baz2'
}, {
  foo: 'baz3',
  bar: 'baz3'
},]}

export function testReducer(state: TestState = initialState, action: TestActions.Actions) {
  switch (action.type) {
    case TestActions.ADD_TEST:
      return [...state.tests, action.payload];
    case TestActions.REMOVE_TEST:
      return state.tests.filter((x, i) => i !== action.payload);
    default:
      return state;
  }
}