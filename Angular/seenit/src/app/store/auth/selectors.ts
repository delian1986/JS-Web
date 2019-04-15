import { State } from './reducer';

export const getToken=(state:State)=>state.token;
export const getUserId=(state:State)=>state.userId;
export const getUsername=(state:State)=>state.username;
export const getErrorMessage=(state:State)=>state.errorMessage;
