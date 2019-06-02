import { combineReducers } from "redux";
import { reportReducer } from "./reducers/reportReducer";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { takeLatest, all, fork } from "@redux-saga/core/effects";
import { Report } from "../models/report";
import { GET_FULL_REPORT, MAKE_TRANSACTION, CHECK_CODE } from "./actions/actions";
import { dbMakeTransaction, dbFullReport, dbCheckCode } from "./saga";
import { composeWithDevTools } from 'redux-devtools-extension';

export interface AppState {
  report: Report
}

export const reducers = combineReducers({
  report: reportReducer
})

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)));

  sagaMiddleware.run(rootSaga);

  return store;
}

export function* reportSaga() {
  yield takeLatest(GET_FULL_REPORT, dbFullReport)
  yield takeLatest(CHECK_CODE, dbCheckCode)
}

export function* transactionSaga() {
  yield takeLatest(MAKE_TRANSACTION, dbMakeTransaction)
}

export function* rootSaga(){
  yield all([
    fork(reportSaga),
    fork(transactionSaga)
  ])
}

export const store = configureStore();