import { userService } from './userService';
import { User, RegisterUser } from '../models/user';
import { router } from '../../framework/router';
import { v4 as guid } from 'uuid';

class AuthService {

  currentUser: User = {
    username: '',
    firstName: '',
    id: -1,
    lastName: '',
    loginToken: '',
    password: ''
  };

  public login(username: string, password: string, error: Function) {
    userService.getByUsername(username).then(res => {
      let user = res[0];
      if (user.password === password) {
        this.currentUser = user;
        localStorage.setItem('token', user.loginToken);
        router.navigateTo('/', true, true);
      }
      else {
        error('Username or password incorrect.');
      }
    }, err => {
      error(err);
    });
  }

  public register(user: RegisterUser, error: Function) {
    user.loginToken = guid();
    userService.add(user).subscribe(res => {
      this.currentUser = res;
      localStorage.setItem('token', res.loginToken);
      router.navigateTo('/', true, true);
    }, err => {
      error(err);
    });
  }

  public setCurrentUser(next) {
    if (this.isAuthenticated()) {
      let token = localStorage.getItem('token');
      if (token)
        userService.getByToken(token).then(res => {
          this.currentUser = res[0];
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
      firstName: '',
      id: -1,
      lastName: '',
      loginToken: '',
      password: ''
    };
    localStorage.removeItem('token');
    router.navigateTo('/', true, true);
  }
}

export const auth = new AuthService();