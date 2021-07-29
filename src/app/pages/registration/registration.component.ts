import { NotifierService } from 'angular-notifier';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { appName } from 'configs/configs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  appName: string = appName;

  constructor(private formBuilder: FormBuilder,
    private loadServ: LoadingService,
    public authServ: AuthenticationService,
    private notifier: NotifierService,
    private router:Router) {

    this.registrationForm = this.formBuilder.group({
      email: [null, Validators.email],
      password: [null, Validators.minLength(6)],
      rePassword: [null, Validators.minLength(6)]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.registrationForm.controls.password.value !== this.registrationForm.controls.rePassword.value) {
      alert('Les mots de passe ne sont pas identiques');
      return;
    }
    this.loadServ.presentLoading();
    this.authServ.register(this.registrationForm.controls.email.value, this.registrationForm.controls.password.value ).then(res => {
      this.loadServ.hideLoading();
      this.notifier.notify('success', 'Votre inscription s\'est déroulée avec succès, veuillez vous connecter.');
      this.router.navigateByUrl('/connexion');
    }).catch(err => {
      this.loadServ.hideLoading();
      this.notifier.notify('error', err.message);

    });
  }

}
