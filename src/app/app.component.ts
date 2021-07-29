import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  userSubscription: Subscription;

  constructor(private authServ:AuthenticationService, private router:Router) {

  }

  ngOnInit(): void {
    this.userSubscription = this.authServ.userObs.subscribe((user: any) => {
      // console.log(user);
      if (!user) {
        this.router.navigateByUrl('/connexion');
      }
    }, error => console.log("error", error));

  }
}
