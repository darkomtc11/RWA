import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

import { Login } from '../../../actions/auth.actions';
import { LoginUser, RegisterUser } from 'src/app/models/user.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/reducers/auth.reducer';
import * as AuthActions from '../../../actions/auth.actions'
import { FormValidatorService } from 'src/app/services/form-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  authObs: Observable<AuthState>;

  constructor(
    private _store: Store<AppState>,
    private _fb: FormBuilder
  ) {
    this.authObs = this._store.select('auth');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get formErrors() {
    return this.registerForm.errors;
  }

  ngOnInit() {
    this.registerForm = this._fb.group(
      {
        username: [
          '',
          [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('^[A-Za-z]+(?:[A-Za-z0-9_-]+)*$')]
        ],
        firstName: [
          '',
          [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern('^[a-zA-Z]+$')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern('^[a-zA-Z]+$')],
        ],
        email: [
          '',
          [Validators.required, Validators.email]
        ],
        password: [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(40), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]
        ],
        confirmPassword: [
          '',
          Validators.required
        ]
      }, { validators: [FormValidatorService.matchPassword] });

    this._store.dispatch(new AuthActions.ResetErrorMessage())
  }

  showInvalid(){
    this._store.dispatch(new AuthActions.ShowInvalid());
  }

  onSubmit(): void {
    const payload: RegisterUser = this.registerForm.value;
    payload.bookedFlights = [];
    this._store.dispatch(new AuthActions.Register(payload));
  }
}
