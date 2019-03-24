import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {
  token : string;

  constructor(
    private router : Router,
    private toastr : ToastrService
  ) {  }

  signupUser(email : string, password : string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() =>  {
        this.toastr.success('Signed up', 'SUCCESS!!');
        this.router.navigate(['/auth/signin']);
      })
      .catch(err => {
        this.toastr.error(err.message, 'Warning!');
      }); 
  }

  signinUser(email : string, password : string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().currentUser
      .getIdToken()
      .then((token : string) => {
        this.token = token;
        localStorage.setItem('token', token);
      })

      this.toastr.success('Signed in', 'SUCCESS!!');
      this.router.navigate(['/']);
    })
    .catch(err => {
      this.toastr.error(err.message, 'Warning!');
    }); 
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  getToken() {
    firebase.auth().currentUser
      .getIdToken()
      .then((token : string) => {
        this.token = token;
      })

    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
