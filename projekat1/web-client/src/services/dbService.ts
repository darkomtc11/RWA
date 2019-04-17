import { environments } from "../environments";
import { Observable } from 'rxjs';

export abstract class dbService {
  constructor(protected _resource) {

  }

  get(): Observable<any> {
    return Observable.create(obs => {
      fetch(`${environments.serverApiUrl}/${this._resource}`)
        .then(res => res.json())
        .then(data => {
          data.forEach(element => {
            obs.next(element);
          });
          obs.complete();
        }).catch(err => obs.error(err));
    });
  }

  getById(id: number): Observable<any> {
    return Observable.create(obs => {
      fetch(`${environments.serverApiUrl}/${this._resource}/${id}`)
        .then(res => res.json())
        .then(data => {
          obs.next(data);
          obs.complete();
        }).catch(err => obs.error(err));
    });
  }

  add(model: any): Observable<any> {
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

  updateById(id: number, model: any, patch: boolean = true): Observable<any> {
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
      })
        .then(res => res.json())
        .then(data => {
          obs.next(data);
          obs.complete();
        }).catch(err => obs.error(err));
    });
  }
}

