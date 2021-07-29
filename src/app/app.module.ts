import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { FaceIdentificationComponent } from './pages/face-identification/face-identification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import Amplify, { Auth } from 'aws-amplify';
import { awsConfig } from 'configs/configs';
import { customNotifierOptions } from 'notifierConfig';

Amplify.configure(awsConfig);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    FaceIdentificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
