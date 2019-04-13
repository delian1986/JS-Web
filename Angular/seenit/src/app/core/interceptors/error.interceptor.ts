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
import { tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: "root"
})
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private tostr: ToastrService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
       

        return next.handle(req)
            .pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && req.url.endsWith(`login`)) {
                    this.tostr.success('Logged in!');
                    this.authService.saveUserInfo(event.body);
                }
            })
        );
    }

}