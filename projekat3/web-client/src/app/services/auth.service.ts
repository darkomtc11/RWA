import { Injectable } from '@angular/core';
import { LoginUser, User, RegisterUser } from '../models/user.models';
import { Observable, Subscriber, throwError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  getById(id: string): Observable<User> {
    return this._http.get<User>(`${env.serverUrl}/users/${id}`).pipe(catchError(err => {
      return throwError("User not found.");
    }))
  }

  login(user: LoginUser): Observable<User | string> {
    return Observable.create((obs: Subscriber<User | string>) => {
      this._http.get<User[]>(`${env.serverUrl}/users?username=${user.username}&password=${user.password}`).subscribe(res => {
        if (res && res.length > 0) {
          obs.next(res[0]);
          obs.complete();
        }
        else {
          obs.next("Username or password incorrect.");
          obs.complete();
        }
      });
    });
  }

  register(user: RegisterUser): Observable<User | string> {
    return Observable.create((obs: Subscriber<User | string>) => {
      this._http.get<User[]>(`${env.serverUrl}/users?username=${user.username}`).subscribe(res => {
        if (!res || res.length == 0) {
          this._http.get<User[]>(`${env.serverUrl}/users?email=${user.email}`).subscribe(res => {
            if (!res || res.length == 0) {
              this._http.post<User>(`${env.serverUrl}/users`, user).subscribe(res => {
                obs.next(res);
                obs.complete();
              });
            }
            else {
              obs.next("Email already taken.");
              obs.complete();
            }
          });
        }
        else {
          obs.next("Username already taken.");
          obs.complete();
        }
      });
    });
  }
}
