import * as FlightActions from "../actions/flight.actions";
import { createEntityAdapter, EntityState } from "@ngrx/entity"
import { createFeatureSelector } from "@ngrx/store"
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
      eClassType.first,
      eClassType.business,
      eClassType.premium,
      eClassType.economy,
    ]
  }
}

export const initialState: FlightState = flightAdapter.getInitialState(defaultData);

export function flightReducer(state: FlightState = initialState,
  action: FlightActions.Actions) {

  switch (action.type) {
    case FlightActions.ADD_SUCCESS:
      return flightAdapter.addOne(action.payload, state);
    case FlightActions.REMOVE_SUCCESS:
      return flightAdapter.removeOne(action.payload, state);
    case FlightActions.BOOK_SUCCESS:
      return flightAdapter.updateOne({ id: action.id, changes: action.changes }, state);
    case FlightActions.FETCH_SUCCESS:
      return flightAdapter.addAll(action.payload, state);
    default: return state;
  }

}

export const getFlightState = createFeatureSelector<FlightState>("flight");

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = flightAdapter.getSelectors(getFlightState);