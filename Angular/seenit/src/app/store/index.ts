import { reducer as authReducer, State as AuthState } from './auth/reducer';
import { createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import * as auth from './auth/selectors';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from '../core/app-router-serizlizer';
import { environment } from 'src/environments/environment.prod';
import {storeFreeze} from 'ngrx-store-freeze';

// export const metaReducers:MetaReducer<AppState> [] = !environment.production?(storeFreeze):[];

export const reducers = {
    auth: authReducer,
    router: routerReducer
};

export interface AppState {
    auth: AuthState;
    router: RouterReducerState<RouterStateUrl>
};

/* Auth Selectors*/
export const getAuthStore = createFeatureSelector('auth');
export const getAuthUsername = createSelector(getAuthStore, auth.getUsername);
export const getAuthUserId = createSelector(getAuthStore, auth.getUserId);
export const getAuthErrorMessage = createSelector(getAuthStore, auth.getErrorMessage);
export const getAuthToken = createSelector(getAuthStore, auth.getToken);
export const getIsAuthenticated = createSelector(getAuthToken, (token => !!token));

/* Router Selectors */
export const getRouterStore = createFeatureSelector('router');
export const getRouterUrl = createSelector(getRouterStore,
    (routerState: RouterReducerState<RouterStateUrl>) => {
        return routerState ? routerState.state.url : ''
    });
