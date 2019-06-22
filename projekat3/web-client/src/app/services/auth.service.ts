import { Injectable } from '@angular/core';
import { LoginUser, User } from '../models/user.models';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  login(payload: LoginUser): Observable<User> {
    return Observable.create((obs: Subscriber<User|null>) => {
      this._http.get<User[]>(`${env.serverUrl}/users?username=${payload.username}`).subscribe(res => {
        if (res && res.length > 0) {
          obs.next(res[0]);
          obs.complete();
        }
        else {
          obs.next(null);
          obs.complete();
        }
      });
    });
  }
}
