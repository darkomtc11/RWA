import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { testReducer } from './reducers/test.reducer';
import { TestComponent } from './components/test/test.component';
import { MaterialBundleModule } from './modules/material-bundle.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { LoginComponent } from './components/auth-components/login/login.component';
import { RegisterComponent } from './components/auth-components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { authReducer } from './reducers/auth.reducer';
import { reducers } from './reducers';
import { FlightListComponent } from './components/flight-components/flight-list/flight-list.component';
import { FlightEffects } from './effects/flight.effects';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LoginComponent,
    RegisterComponent,
    FlightListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    MaterialBundleModule,
    EffectsModule.forRoot([AuthEffects, FlightEffects]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
