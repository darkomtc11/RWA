import { Partial } from '../../../../framework/partial';
import { auth } from '../../../services/authService';

export class Login extends Partial {

  constructor() {
    super('login.html', '/login');
  }

  loginForm: HTMLFormElement;

  events = {
    submitLoginForm: (event) => {
      event.preventDefault();
      this.loginForm = (document.getElementById('loginForm') as HTMLFormElement);
      const data = new FormData(this.loginForm);

      const loginInfo = {
        username: '',
        password: ''
      };

      data.forEach((value, key) => { loginInfo[key] = value });
      auth.login(loginInfo.username, loginInfo.password, (errorMessage) => {
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