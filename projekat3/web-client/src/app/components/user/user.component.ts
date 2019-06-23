import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/reducers/auth.reducer';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  authObs: Observable<AuthState>;
  constructor(private _store: Store<AppState>) {
    this.authObs = _store.select("auth");
  }

  parseType(type) {
    switch (type) {
      case 0: return "first class";
      case 1: return "business class";;
      case 2: return "premium class";;
      case 3: return "economy class";;
    }
  }

  ngOnInit() {
  }

}
