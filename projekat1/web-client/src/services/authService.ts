import { userService } from './userService';
import { filter } from 'rxjs/operators';
import { User } from '../models/user';
import { router } from '../router';

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

  public login(username: string, password: string) {
    userService.getByUsername(username).subscribe(res => {
      if (res.password === password) {
        this.currentUser = res;
        localStorage.setItem('token', res.loginToken);
        router.navigateTo('/', true);
      }
      else{
        console.error('Username or password incorrect.');
      }
    }, error => {
      console.error(error);
    });
  }

  public setCurrentUser(next) {
    if (this.isAuthenticated()) {
      let token = localStorage.getItem('token');
      userService.getCurrentUser(token).subscribe(res => {
        this.currentUser = res;
        next();
      }, error => {
        console.error(error);
        next();
      })

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