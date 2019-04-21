import { environments } from "../environments";
import { Observable, from, timer, Observer } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import { flatMap, map, mergeMap, concatMap } from "rxjs/operators";
import { User } from "../public/views/user/user";

export abstract class dbService<T> {
  constructor(protected _resource) {

  }

  get(): Observable<T[]> {
    return from(fetch(`${environments.serverApiUrl}/${this._resource}`))
      .pipe(flatMap(response => response.json()))
  }

  getById(id: number): Observable<T> {
    return from(fetch(`${environments.serverApiUrl}/${this._resource}/${id}`))
      .pipe(flatMap(response => response.json()));
  }

  add(model: T): Observable<T> {
    return from(fetch(`${environments.serverApiUrl}/${this._resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    })).pipe(flatMap(response => response.json()));
  }

  public updateById(id: number, model: T, patch: boolean = true): Observable<T> {
    return from(fetch(`${environments.serverApiUrl}/${this._resource}/${id}`, {
      method: patch ? 'PATCH' : 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    })).pipe(flatMap(response => response.json()));
  }

  removeById(id: number): Observable<any> {
    return from(fetch(`${environments.serverApiUrl}/${this._resource}/${id}`, {
      method: 'DELETE'
    }))
  }
}

