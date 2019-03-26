import{
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    constructor(
        private router:Router,
        private toastr:ToastrService
        ){}

    intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {
        let currentUser=JSON.parse(localStorage.getItem('currentUser'))
        
        if(currentUser && currentUser.token){
            req=req.clone({
                setHeaders:{
                    'Authorization':'Bearer '+currentUser.token
                }
            })
        }

        return next.handle(req).pipe(tap((res:any)=>{
            if(res instanceof HttpResponse && res.body.token){
                this.saveToken(res.body)
                this.toastr.success(`${res.body.user.name}, you are successfully logged in!`)
                this.router.navigate(['/furniture/all'])
            }

            if(res instanceof HttpResponse && res.body.success && res.url.endsWith('signup')){
                this.toastr.success(res.body.message)
                this.router.navigate(['/signin'])
            }

            if(res instanceof HttpResponse && res.body.success && res.url.endsWith('create')){
                this.toastr.success(res.body.message)
                this.router.navigate(['/furniture/all'])
            }
        }))
    }

    private saveToken(data){
        localStorage.setItem('currentUser',JSON.stringify({
            'username': data.user.name,
            'token':data.token,
            "isAdmin":data.user.isAdmin
        }))
    }

}