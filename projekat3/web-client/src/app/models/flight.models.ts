export interface Flight {
  id: number;
  airline: string;
  from: string;
  to: string;
  date: Date;
  seats: Seats[];
}

export interface Seats {
  type: eClassType;
  number: number;
}

export interface Booking {
  id: number;
  seats: Seats
}

export enum eClassType {
  first,
  business,
  premium,
  economy
}

export interface Filter{
  from: string;
  to:string;
  classes: eClassType[];
}