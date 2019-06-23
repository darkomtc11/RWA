import { Booking } from './flight.models';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bookedFlights: Booking[]
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}