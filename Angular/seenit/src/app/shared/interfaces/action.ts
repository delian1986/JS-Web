import {Action} from '@ngrx/store'

export interface Action<T> extends Action{
    payload:T;
}