import { Action } from "redux";
import { GET_REPORT, GetReport, CHANGE_STATE, ChangeState } from "../actions/actions";
import { Report } from "../../models/report";

const initialState: Report = new Report();

export function reportReducer(state: Report = initialState, action: Action) {
  switch (action.type) {
    case GET_REPORT: {
      const { dateFrom, dateTo } = (action as GetReport);
      if (dateFrom !== undefined && dateTo !== undefined) {
        const newState = state.initalizeFromTransactions(dateFrom, dateTo);
        return newState;
      }
      return state;
    }
    case CHANGE_STATE: {
      const { report } = (action as ChangeState);
      const newState = Report.copy(report);
      return newState;
    }
    default:
      return state;
  }
}