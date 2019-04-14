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
    return Observable.create(observer => {
      this.get().pipe<User>(filter(x => x.username === username)).toPromise().then(res => {
        if (res)
        {
          observer.next(res);
          observer.complete();
        }
        else
        {
          observer.error('Username or password incorrect.');
          observer.complete();
        }
      });
    })
  }


  getCurrentUser(token: string): Observable<any> {
    return Observable.create(observer => {
      this.get().pipe<User>(filter(x => x.loginToken === token)).toPromise().then(res => {
        if (res)
        {
          observer.next(res);
          observer.complete();
        }
        else
        {
          observer.error('Username or password incorrect.');
          observer.complete();
        }
      });
    })
  }
}

export const userService = new userDbService();