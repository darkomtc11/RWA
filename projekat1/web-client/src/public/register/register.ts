import { Partial } from '../../../framework/partial';
import { auth } from '../../services/authService';

export class Register extends Partial {

  user = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    loginToken: ''
  };

  constructor() {
    super('register.html', '/register');
  }

  form: HTMLFormElement;

  private registerForm = {
    submit: (event) => {
      event.preventDefault();
      this.form = (document.getElementById('registerForm') as HTMLFormElement);
      const data = new FormData(this.form);

      data.forEach((value, key) => { this.user[key] = value });
      if (this.validateForm())
        auth.register(this.user, (errorMessage) => {
          if (errorMessage) {
            this.showError(errorMessage);
          }
        });
    }
  }

  private showError(errorMessage) {
    if (errorMessage) {
      document.getElementById('errorMessage').innerText = errorMessage;
    }
  }

  private validateForm() {

    let errors = {
      username: null,
      firstName: null,
      lastName: null,
      password: null,
      confirmPassword: null
    }

    const usernameRegex = /^([a-zA-Z0-9]+){4,25}$/;
    if (!usernameRegex.test(this.user.username))
      errors.username = 'Enter correct username. (4-25 characters, alpha and numbers only)';
    else
      errors.username = null;

    const nameRegex = /^([a-zA-Z]+){2,25}$/;
    if (!nameRegex.test(this.user.firstName))
      errors.firstName = 'Enter correct first name. (2-25 characters and alpha only)';
    else
      errors.firstName = null;

    if (!nameRegex.test(this.user.lastName))
      errors.lastName = 'Enter correct last name. (2-25 characters and alpha only)';
    else
      errors.lastName = null;

    const passwordRegex = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+){2,30}$/;
    if (!passwordRegex.test(this.user.password))
      errors.password = 'Enter correct password. (4-30 characters, alpha and numbers only)';
    else
      errors.password = null;

    if (this.user.password !== this.user.confirmPassword)
      errors.confirmPassword = 'Enter correct password confirmation. (must match password field)';
    else
      errors.confirmPassword = null;

    let valid = true;
    for (let err in errors) {
      if (errors[err]) {
        document.querySelector(`small[for="${err}"]`).innerHTML = errors[err];
        valid = false;
      }
      else {
        document.querySelector(`small[for="${err}"]`).innerHTML = '';
      }
    }

    return valid;
  }



}