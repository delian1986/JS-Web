import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { APP_KEY, APP_SECRET } from 'src/app/kinvey.tokens';
import { AuthService } from '../services/auth.service';
import { tap, switchMap, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState,getAuthToken } from 'src/app/store';

@Injectable({
    providedIn: "root"
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private tostr: ToastrService,
        private store:Store<AppState>
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.store.select(getAuthToken).pipe(take(1),switchMap(token =>{
            if (req.url.endsWith(`/user/${APP_KEY}`) || req.url.endsWith(`login`)) {
                req = req.clone({
                    setHeaders: {
                        'Authorization': `Basic ${btoa(`${APP_KEY}:${APP_SECRET}`)}`,
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                req = req.clone({
                    setHeaders: {
                        'Authorization': `Kinvey ${token}`
                    }
                })
            }
    
            return next.handle(req)
                .pipe(tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse && req.url.endsWith(`login`)) {
                        this.tostr.success('Logged in!');
                        // this.authService.saveUserInfo(event.body);
                    }
                })
            );
        }))
        
    }

}