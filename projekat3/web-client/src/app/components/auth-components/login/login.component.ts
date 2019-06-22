import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

import { Login } from '../../../actions/auth.actions';
import { LoginUser } from 'src/app/models/user.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _store: Store<AppState>,
    private _fb: FormBuilder
  ) { }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.loginForm = this._fb.group(
      {
        username: [
          '',
          [Validators.required]
        ],
        password: [
          '',
          [Validators.required]
        ]
      });
  }

  onSubmit(): void {
    const payload: LoginUser = this.loginForm.value;
    this._store.dispatch(new Login(payload));
  }
}
