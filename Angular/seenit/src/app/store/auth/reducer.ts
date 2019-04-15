import { ActionTypes, Actions, LoginSuccess, LoginFailed, SetToken } from './actions';

export interface State{
    userId:string;
    username:string;
    token:string;
    errorMessage:string;
}

const initialState:State={
    userId:null,
    username:null,
    token:null,
    errorMessage:null
};

export function reducer(state=initialState,action:Actions):State{
    switch(action.type){
        case ActionTypes.LoginSuccess:{
            const {userId,username,token}=(action as LoginSuccess).payload;
            return {...state,userId,username,token};
        }

        case ActionTypes.LoginFailed:{
            const {error}=(action as LoginFailed).payload;
            return{...state,errorMessage:error.description}
        }

        case ActionTypes.SetToken:{
            const {token}=( action as SetToken).payload;
            return {...state,token};
        }

        case ActionTypes.LogoutSuccess:{
            return initialState;
        }
    }
    return state;
}