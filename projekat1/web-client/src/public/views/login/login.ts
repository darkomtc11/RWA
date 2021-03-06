import { Partial } from '../../../../framework/partial';
import { auth } from '../../../services/authService';

export class Login extends Partial {

  constructor() {
    super(Login._template.cloneNode(true) as HTMLElement, '/login');
  }

  private loginForm: HTMLFormElement;

  private events = {
    submitLoginForm: (event) => {
      event.preventDefault();
      this.loginForm = (this.$('#loginForm') as HTMLFormElement);
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

  private showError(errorMessage) {
    if (errorMessage) {
      this.$('#errorMessage').innerText = errorMessage;
    }
  }



}