import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ActionTypes, Login, LoginSuccess, LoginFailed, SetToken, LogoutFailed, LogoutSuccess } from './actions';
import { AuthService } from 'src/app/core/services/auth.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }

    @Effect() init$ = this.actions$.pipe(ofType('@ngrx/effects/init'), switchMap(() => {
        const token = localStorage.getItem('token');
        if (!token) { return []; }
        return [new SetToken({ token })];
    }));

    @Effect() login$ = this.actions$.pipe(
        ofType<Login>(ActionTypes.Login),
        map(action => action.payload),
        switchMap(data => {
            return this.authService.login(data).pipe(
                map(({ username, _kmd: { authtoken: token }, _id: userId }) => {
                    return new LoginSuccess({ userId, username, token });

                }),
                tap(({ payload: { token } }) => {
                    localStorage.setItem('token', token);
                    this.router.navigate(['posts']);
                }),
                catchError((err) => [new LoginFailed({ error: err.description })])
            );
        }),
    );

    @Effect() logout$ = this.actions$.pipe(
        ofType(ActionTypes.Logout),
        switchMap(() => this.authService.logout().pipe(
            map(() => new LogoutSuccess()),
            tap(()=>{
                localStorage.clear();
                this.router.navigate([ '/login' ]);
            }),
            catchError((error) => [new LogoutFailed({ error })])
        ))
    );

}