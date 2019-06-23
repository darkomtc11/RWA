import { ActionReducerMap } from "@ngrx/store";
import { flightReducer } from "./flight.reducer";
import { authReducer } from "./auth.reducer";


export const reducers: ActionReducerMap<any> = {
  flight: flightReducer,
  auth: authReducer
}