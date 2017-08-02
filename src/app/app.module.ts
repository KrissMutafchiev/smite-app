import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { firebaseConfig } from './../environments/firebase.config';


import { AppComponent } from './app.component';
import { UserAuthentication } from './components/user-authentication.component';
import { BackgroundScenComponent } from './background-scen/background-scen.component';

@NgModule({
  declarations: [
    AppComponent,
    UserAuthentication,
    BackgroundScenComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
