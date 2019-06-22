import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { testReducer } from './reducers/test.reducer';
import { TestComponent } from './components/test/test.component';
import { MaterialBundleModule } from './modules/material-bundle.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { LoginComponent } from './components/auth-components/login/login.component';
import { RegisterComponent } from './components/auth-components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ test: testReducer }),
    StoreDevtoolsModule.instrument({
      maxAge:5
    }),
    MaterialBundleModule,
    EffectsModule.forRoot([AuthEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
