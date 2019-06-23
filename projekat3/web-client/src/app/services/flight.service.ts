import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../models/flight.models';
import { Observable } from 'rxjs';
import { environment as env } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private _http: HttpClient) { }

  add(flight: Partial<Flight>): Observable<Flight> {
    return this._http.post<Flight>(`${env.serverUrl}/flights`, flight);
  }

  remove(id: number): Observable<Flight> {
    return this._http.delete<Flight>(`${env.serverUrl}/flights/${id}`);
  }

  update(flight: Flight): Observable<Flight> {
    return this._http.patch<Flight>(`${env.serverUrl}/flights/${flight.id}`, flight);
  }

  get(): Observable<Flight[]> {
    return this._http.get<Flight[]>(`${env.serverUrl}/flights`);
  }
}
