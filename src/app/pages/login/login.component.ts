import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { appName } from 'configs/configs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  appName: string = appName;

  constructor(private formBuilder: FormBuilder,
    private authServ: AuthenticationService,
    private loadServ: LoadingService, private notifier:NotifierService, private router:Router) {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.email],
      password: [null, Validators.minLength(6)]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    this.loadServ.presentLoading();
    this.authServ.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value ).then(res => {
      this.loadServ.hideLoading();
      this.router.navigateByUrl(`/identification`);
    }).catch(err => {
      this.loadServ.hideLoading();
      this.notifier.notify('error', err.message);

    });
  }

}
