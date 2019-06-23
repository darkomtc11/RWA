import * as FlightActions from "../actions/flight.actions";
import { createEntityAdapter, EntityState } from "@ngrx/entity"
import { createFeatureSelector, createSelector } from "@ngrx/store"
import { Flight, Filter, eClassType } from '../models/flight.models';

export const flightAdapter = createEntityAdapter<Flight>();


export interface FlightState extends EntityState<Flight> {
  filter: Filter
}

const defaultData =
{
  filter: {
    from: '',
    to: '',
    classes: [
    ]
  }
}

export const initialState: FlightState = flightAdapter.getInitialState(defaultData);

export function flightReducer(state: FlightState = initialState, action: FlightActions.Actions) {
  switch (action.type) {
    case FlightActions.ADD_SUCCESS:
      return flightAdapter.addOne(action.payload, state);
    case FlightActions.REMOVE_SUCCESS:
      return flightAdapter.removeOne(action.payload, state);
    case FlightActions.BOOK_SUCCESS:
      return flightAdapter.updateOne({ id: action.id, changes: action.changes }, state);
    case FlightActions.FETCH_SUCCESS:
      return flightAdapter.addAll(action.payload, state);

    case FlightActions.FILTER:
      return { ...state, filter: action.payload };
    default: return state;
  }
}

export const getFlightState = createFeatureSelector<FlightState>("flight");
export const selectFilter = createSelector(getFlightState, state => state.filter);

export const {
  selectIds,
  selectEntities,
  selectAll
} = flightAdapter.getSelectors(getFlightState);

export const selectFiltered = createSelector(
  selectAll,
  selectFilter,
  (allFlights: Flight[], filter: Filter) => {
    return allFlights.filter(x => {
      let ret = true;

      if (!filter.from || x.from.includes(filter.from)) {
        ret = ret && true;
      }
      else {
        ret = false;
      }
      if (!filter.to || x.to.includes(filter.to)) {
        ret = ret && true;
      } else {
        ret = false;
      }
      ret = ret && filter.classes.reduce((acc, c) => {
        if (acc && x.seats.filter(y => y.type == c && y.number > 0).length > 0)
          return true;
        else
          return false;
      }, true)

      return ret;
    })
  }
);