import { Partial } from '../../../framework/partial';
import { auth } from '../../services/authService';

export class Login extends Partial {

  constructor() {
    super('login.html', '/login');
  }

  loginForm = {
    submit: (event) => {
      event.preventDefault();
      const form: any = document.getElementById('loginForm');
      const data = new FormData(form);

      const user = {
        username: '',
        password: ''
      };

      data.forEach((value, key) => { user[key] = value });
      auth.login(user.username, user.password, (errorMessage) => {
        if (errorMessage) {
          this.showError(errorMessage);
        }
      });
    }
  }

  showError(errorMessage) {
    if (errorMessage) {
      document.getElementById('errorMessage').innerText = errorMessage;
    }
  }



}