import { environments } from "../environments";
import { Observable } from 'rxjs';
import { User } from "../models/user";

export class dbService {
  constructor(protected _resource) {

  }

  get(): Observable<User> {
    return Observable.create(obs => {
      fetch(`${environments.serverApiUrl}/${this._resource}`).then(res => {
        return res.json();
      }).then(data => {
        data.forEach(element => {
          obs.next(element);
        });
        obs.complete();
      });
    });
  }

  getById(id: number): Observable<any> {
    return Observable.create(observer => {
      fetch(`${environments.serverApiUrl}/${this._resource}/${id}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }

  add(model: any): Observable<any> {
    return Observable.create(observer => {
      fetch(`${environments.serverApiUrl}/${this._resource}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
      })
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }

  updateById(id: number, model: any, patch: boolean = true): Observable<any> {
    return Observable.create(observer => {
      fetch(`${environments.serverApiUrl}/${this._resource}/${id}`, {
        method: patch ? 'PATCH' : 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
      })
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }

  removeById(id: number): Observable<any> {
    return Observable.create(observer => {
      fetch(`${environments.serverApiUrl}/${this._resource}/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }
}

