import { dbService } from './dbService';
import { environments } from '../environments';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { filter } from 'rxjs/operators';

class userDbService extends dbService {
  constructor() {
    super(environments.usersResourceUrl)
  }

  getByUsername(username: string): Observable<any> {
    return Observable.create(obs => {
      this.get().pipe<User>(filter(x => x.username === username)).toPromise().then(res => {
        if (res) {
          obs.next(res);
          obs.complete();
        }
        else {
          obs.error('Username or password incorrect.');
        }
      }).catch(err => console.error(err));
    });
  }

  getByToken(token: string): Observable<any> {
    return Observable.create(obs => {
      this.get().pipe<User>(filter(x => x.loginToken === token)).toPromise().then(res => {
        if (res) {
          obs.next(res);
          obs.complete();
        }
        else {
          obs.error('No user with such token.');
        }
      }).catch(err => console.error(err));
    });
  }
}

export const userService = new userDbService();