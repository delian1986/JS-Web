import { Injectable } from '@angular/core'
import * as firebase from 'firebase'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class AuthService {
    token: string

    constructor(private toast: ToastrService,
        private router: Router
    ) {

    }

    signUp(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((data) => {
                this.router.navigate(['/auth/login'])
                this.toast.success('Register success!')
            })
            .catch((e) => {
                this.toast.error(e.message)
            })
    }

    signIn(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((data) => {
                firebase.auth()
                    .currentUser
                    .getIdToken()
                    .then((token: string) => {
                        
                        this.token = token
                    })
                this.router.navigate(['/recipes/start'])
                this.toast.success('Logged in!')
            })
            .catch((e) => {
                this.toast.error(e.message)
            })

    }

    logout() {
        firebase.auth().signOut()
        .then(()=>{
            this.router.navigate(['/'])
            this.toast.success('LoggedOut')
        }).catch(e=>{
            this.toast.error(e.message)
        })
        this.token = null

    }

    getToken() {
        firebase.auth()
            .currentUser
            .getIdToken()
            .then((token: string) => {
                this.token = token
            })

        return this.token
    }

    isAuthenticated() {
        return this.token != null
    }
}

