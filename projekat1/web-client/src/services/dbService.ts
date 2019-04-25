import { environments } from "../environments";
import { Observable, from } from 'rxjs';
import { flatMap, concatMap, switchMap } from "rxjs/operators";

export abstract class dbService<T> {
  constructor(protected _resource) {

  }

  get(): Observable<T> {

    return from(fetch(`${environments.serverApiUrl}/${this._resource}`).then(response => response.json())).pipe(switchMap<Observable<T>, Observable<T>>(x => x));

    // return Observable.create(obs => {
    //   fetch(`${environments.serverApiUrl}/${this._resource}`).then(response => response.json()).then(data => {
    //     data.map(x => {
    //       obs.next(x);
    //     });
    //     obs.complete();
    //   });
    // });
  }

  getById(id: number): Observable<T> {
    return from(fetch(`${environments.serverApiUrl}/${this._resource}/${id}`).then(res => res.json()));
  }

  add(model: T): Observable<T> {
    return from(fetch(`${environments.serverApiUrl}/${this._resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    }).then(res => res.json()));
  }

  updateById(id: number, model: T, patch: boolean = true): Observable<T> {
    return from(fetch(`${environments.serverApiUrl}/${this._resource}/${id}`, {
      method: patch ? 'PATCH' : 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    }).then(res => res.json()));
  }

  removeById(id: number): Observable<any> {
    return from(fetch(`${environments.serverApiUrl}/${this._resource}/${id}`, {
      method: 'DELETE'
    }))
  }
}