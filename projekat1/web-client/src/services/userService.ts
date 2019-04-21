import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { filter, take, subscribeOn } from 'rxjs/operators';

class userDbService extends dbService<User> {
  constructor() {
    super(environments.usersResourceUrl)
  }

  getByUsername(username: string): Promise<User> {
    return new Promise((res, rej) => {
      this.get().pipe(take(1), filter<User>(x => x.username === username)).subscribe(user => {
        if (user) {
          res(user);
        }
        else {
          rej('Username or password incorrect.');
        }
      });
    });
  }

  getByToken(token: string): Promise<User> {
    return new Promise((res, rej) => {
      this.get().pipe<User>(filter(x => x.loginToken === token)).subscribe(user => {
        if (user) {
          res(user);
        }
        else {
          rej('No user with such token.');
        }
      });
    });
  }
}

export const userService = new userDbService();