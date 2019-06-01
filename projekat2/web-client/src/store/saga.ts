import { put } from "@redux-saga/core/effects";
import { fetchUpdateReport, fetchFullReport } from "../services/reportService";
import { changeState, MakeTransaction } from "./actions/actions";
import { Report, IReport } from "../models/report";


export function* dbFullReport() {
  const report = yield fetchFullReport(localStorage.id);

  yield put(changeState(report));
}

export function* dbMakeTransaction(action: MakeTransaction) {
  const fullReport = action.report;
  const currentFunds = fullReport.availableFunds + action.amount;

  fullReport.transactions.push({ amount: action.amount, type: action.transactionType, date: new Date(), currentFunds: currentFunds });
  
  const baseReport: IReport = {
    availableFunds: currentFunds,
    id: fullReport.id,
    transactions: fullReport.transactions
  }

  const report: Report = yield fetchUpdateReport(baseReport);
  yield put(changeState(report));
}