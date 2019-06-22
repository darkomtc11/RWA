import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from './reducers/auth.reducer';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import * as AuthActions from './actions/auth.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authObs: Observable<AuthState>;

  constructor(private _store: Store<AppState>) {
    this.authObs = _store.select('auth')
  }

  ngOnInit() {
    let token = localStorage.getItem("token");
    if (token)
      this._store.dispatch(new AuthActions.Check(token));
  }

  logout(){
    this._store.dispatch(new AuthActions.Logout());
  }
}
