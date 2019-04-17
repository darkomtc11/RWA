import { userService } from './userService';
import { filter } from 'rxjs/operators';
import { User } from '../models/user';
import { router } from '../router';
import { v4 as guid } from 'uuid';

class authService {


  currentUser: User = {
    username: '',
    email: '',
    firstName: '',
    id: -1,
    lastName: '',
    loginToken: '',
    password: ''
  };

  public login(username: string, password: string, error: Function) {
    userService.getByUsername(username).subscribe(res => {
      if (res.password === password) {
        this.currentUser = res;
        localStorage.setItem('token', res.loginToken);
        router.navigateTo('/', true);
      }
      else {
        error('Username or password incorrect.');
      }
    }, err => {
      error(err);
    });
  }

  public register(user: { username: string; firstName: string; lastName: string; password: string; confirmPassword: string; loginToken: string }, error: Function) {
    user.loginToken = guid();
    userService.add(user).subscribe(res => {
      this.currentUser = res;
      localStorage.setItem('token', res.loginToken);
      router.navigateTo('/', true);
    }, err => {
      error(err);
    });

  }

  public setCurrentUser(next) {
    if (this.isAuthenticated()) {
      let token = localStorage.getItem('token');
      if (token)
        userService.getByToken(token).subscribe(res => {
          this.currentUser = res;
          next();
        }, error => {
          console.error(error);
          next();
        });
    }
    else {
      next();
    }
  }

  public isAuthenticated() {
    return localStorage.getItem('token') != undefined;
  }

  public logout() {
    this.currentUser = {
      username: '',
      email: '',
      firstName: '',
      id: -1,
      lastName: '',
      loginToken: '',
      password: ''
    };
    localStorage.removeItem('token');
    router.navigateTo('/', true);
  }
}

export const auth = new authService();