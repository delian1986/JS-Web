import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    isAuth: boolean;
    isAuthChanged = new Subject<boolean>();

    constructor(
        private dbAuth: AngularFireAuth,
        private router:Router,
        private snack:MatSnackBar
        
    ) { }

    initializeAuthState() {
        this.dbAuth.authState.subscribe((userData) => {
            if (userData) {
                this.isAuth = true;
                this.isAuthChanged.next(true);
            } else {
                this.isAuth = false;
                this.isAuthChanged.next(false);
            }
        })
    }

    register(email: string, password: string) {
        this.dbAuth.auth
            .createUserWithEmailAndPassword(email, password)
            .then((data) => {
                this.snack.open('Please login!','Undo',{
                    duration: 3000
                  });
                this.router.navigate(['/login']);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    login(email: string, password: string) {
        this.dbAuth.auth
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
                this.snack.open('You are logged in!','Undo',{
                    duration: 3000
                  });
                this.router.navigate(['/']);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    logout() {
        this.dbAuth.auth.signOut();
        this.router.navigate(['/login']);
    }
}