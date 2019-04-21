import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable, from } from 'rxjs';
import { User } from '../models/user';
import { filter, take, subscribeOn, flatMap } from 'rxjs/operators';

class userDbService extends dbService<User> {
  constructor() {
    super(environments.usersResourceUrl)
  }

  getByUsername(username: string): Promise<User> {

    return from(fetch(`${environments.serverApiUrl}/${this._resource}?username=${username}`))
      .pipe(flatMap(response => response.json())).toPromise();

  }

  getByToken(token: string): Promise<User> {

    return from(fetch(`${environments.serverApiUrl}/${this._resource}?loginToken=${token}`))
      .pipe(flatMap(response => response.json())).toPromise();

  }
}

export const userService = new userDbService();