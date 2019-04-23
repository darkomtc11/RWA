import { dbService } from './dbService';
import { environments } from '../environments';
import { from } from 'rxjs';
import { User } from '../models/user';
import { flatMap } from 'rxjs/operators';

class UserService extends dbService<User> {
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

export const userService = new UserService();