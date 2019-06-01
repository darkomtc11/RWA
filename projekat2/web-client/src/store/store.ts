import { combineReducers } from "redux";
import { reportReducer } from "./reducers/reportReducer";
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import { takeLatest } from "@redux-saga/core/effects";
import { Report } from "../models/report";
import { GET_FULL_REPORT, getFullReport, MAKE_TRANSACTION } from "./actions/actions";
import { dbMakeTransaction, dbFullReport } from "./saga";
import { composeWithDevTools } from 'redux-devtools-extension';

export interface AppState {
  report: Report
}

export const reducers = combineReducers({
  report: reportReducer
})

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = applyMiddleware(sagaMiddleware);

  const store = createStore(reducers, composeWithDevTools(middlewares));

  sagaMiddleware.run(rootSaga);

  return store;
}

export function* rootSaga() {
  yield takeLatest(GET_FULL_REPORT, dbFullReport)
  yield takeLatest(MAKE_TRANSACTION, dbMakeTransaction)
}

export const store = configureStore();