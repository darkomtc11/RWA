import { Partial } from '../../../framework/partial';
import { auth } from '../../services/authService';

export class Login extends Partial {

  constructor() {
    super('login.html');
  }

  loginForm = {
    submit: (event) => {
      event.preventDefault();
      let form: any = document.getElementById('loginForm');
      let data = new FormData(form);

      var user = {
        username: '',
        password: ''
      };

      data.forEach((value, key) => { user[key] = value });
      auth.login(user.username, user.password);
    }
  }



}