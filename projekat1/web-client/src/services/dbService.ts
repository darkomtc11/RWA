import { environments } from "../environments";
import { Observable, from, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import { flatMap, map, mergeMap, concatMap } from "rxjs/operators";
import { User } from "../public/views/user/user";

export abstract class dbService<T> {
  constructor(protected _resource) {

  }

  get(): Observable<any> {
    // return Observable.create(obs => {
    //   fetch(`${environments.serverApiUrl}/${this._resource}`)
    //     .then(res => res.json())
    //     .then(data => {
    //       data.map(element => {
    //         obs.next(element);
    //       });
    //       obs.complete();

    //     }).catch(err => obs.error(err));
    // });


    //return from(fetch(`${environments.serverApiUrl}/${this._resource}`)).pipe(mergeMap(response => response.json()))
    return Observable.create(obs=>{
      from(ajax(`${environments.serverApiUrl}/${this._resource}`)).subscribe(x=>{
        x.response.forEach(y=>{
          //console.log(y);
          obs.next(y);
        });
        obs.complete();
      })
    })
    
    return from(fetch(`${environments.serverApiUrl}/${this._resource}`))
      .pipe(flatMap(response => response.json()))

  }

  getById(id: number): Observable<T> {
    return Observable.create(obs => {
      fetch(`${environments.serverApiUrl}/${this._resource}/${id}`)
        .then(res => res.json())
        .then(data => {
          obs.next(data);
          obs.complete();
        }).catch(err => obs.error(err));
    });
  }

  add(model: T): Observable<T> {
    return Observable.create(obs => {
      fetch(`${environments.serverApiUrl}/${this._resource}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
      })
        .then(res => res.json())
        .then(data => {
          obs.next(data);
          obs.complete();
        }).catch(err => obs.error(err));
    });
  }

  public updateById(id: number, model: T, patch: boolean = true): Observable<T> {
    return Observable.create(obs => {
      fetch(`${environments.serverApiUrl}/${this._resource}/${id}`, {
        method: patch ? 'PATCH' : 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(model)
      })
        .then(res => res.json())
        .then(data => {
          obs.next(data);
          obs.complete();
        }).catch(err => obs.error(err));
    });
  }

  removeById(id: number): Observable<any> {
    return Observable.create(obs => {
      fetch(`${environments.serverApiUrl}/${this._resource}/${id}`, {
        method: 'DELETE'
      }).catch(err => obs.error(err));
    });
  }
}

