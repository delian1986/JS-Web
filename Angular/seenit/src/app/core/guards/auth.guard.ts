import { ActivatedRouteSnapshot, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanLoad {

    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canLoad(route: Route, segments: UrlSegment[]) {
        // if (this.authService.isAuthenticated()) {
            return false;
        // }

        // this.router.navigate(['/login'])
        // return false;
    }

}