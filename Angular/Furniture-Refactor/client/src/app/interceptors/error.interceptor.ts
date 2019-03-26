import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http'

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ErrorInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService,
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {

        return next.handle(req)
            .pipe(catchError((err: HttpErrorResponse) => {
                switch (err.status) {
                    case 400:
                        let message = Object.keys(err.error.errors)
                            .map(e => err.error.errors[e])
                            .join('/n')
                            
                        this.toastr.error(message)
                        break;
                    case 401:
                        this.toastr.error(err.message)

                        break;
                }

                return throwError(err.message)
            }))
    }
}