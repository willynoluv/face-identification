import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: any;

  public userObs = new Subject;

  public login(username:string, password:string){
    return new Promise<any>((resolve, reject) => {
      Auth.signIn({ username, password }).then(res => {
        this.user = res;
        this.userObs.next(this.user);
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });

  }

  public getUser() {
    return this.user;
  }

  public register(username:string, password:string){
    return new Promise<any>((resolve, reject) => {
      Auth.signUp({ username, password }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });

  }

  public isUserLoggedIn():boolean {
    if (this.user) {
      return true;
    }
    this.logout();
    return false;
  }


  public logout(): void{
    this.user = null;
    this.userObs.next(this.user);
  }
}
