import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { LoginUser } from 'src/app/models/user.models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/reducers/auth.reducer';
import * as AuthActions from '../../../actions/auth.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  authObs: Observable<AuthState>;

  constructor(
    private _store: Store<AppState>,
    private _fb: FormBuilder
  ) {
    this.authObs = this._store.select('auth');
  }

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

    this._store.dispatch(new AuthActions.ResetErrorMessage())
  }

  showInvalid(){
    this._store.dispatch(new AuthActions.ShowInvalid());
  }

  onSubmit(): void {
    const payload: LoginUser = this.loginForm.value;
    this._store.dispatch(new AuthActions.Login(payload));
  }
}
