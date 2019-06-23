import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.models';
import { Observable, throwError } from 'rxjs';
import {environment as env} from "../../environments/environment"
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  getById(id: string): Observable<User> {
    return this._http.get<User>(`${env.serverUrl}/users/${id}`).pipe(catchError(err => {
      return throwError("User not found.");
    }))
  }

  update(user: Partial<User>): Observable<User> {
    return this._http.patch<User>(`${env.serverUrl}/users/${user.id}`, user);
  }

}
