import { Action } from 'redux';
import { Report } from '../../models/report';
import { TransactionType } from '../../models/transaction';

export const GET_FULL_REPORT = "GET_FULL_REPORT"
export const GET_REPORT = "GET_REPORT"
export const CHANGE_STATE = "CHANGE_STATE";
export const MAKE_TRANSACTION = "MAKE_TRANSACTION";
export const CHECK_CODE = "CHECK_CODE";

export interface GetFullReport extends Action {

}

export function getFullReport(): GetFullReport {
  return {
    type: GET_FULL_REPORT
  };
}

export interface GetReport extends Action {
  dateFrom: Date,
  dateTo: Date
}

export function getReport(dateFrom: Date, dateTo: Date): GetReport {
  return {
    dateTo: dateTo,
    dateFrom: dateFrom,
    type: GET_REPORT
  };
}

export interface ChangeState extends Action {
  report: Report;
}

export function changeState(report: Report): ChangeState {
  return {
    report: report,
    type: CHANGE_STATE
  }
}

export interface MakeTransaction extends Action {
  amount: number,
  transactionType: TransactionType,
  report: Report
}

export function makeTransaction(amount: number, transactionType: TransactionType, report:Report): MakeTransaction {
  return {
    amount: amount,
    transactionType: transactionType,
    report: report,
    type: MAKE_TRANSACTION
  };
}

export interface CheckCode extends Action {
  code: string
}

export function checkCode(code: string): CheckCode {
  return {
    code: code,
    type: CHECK_CODE
  };
}