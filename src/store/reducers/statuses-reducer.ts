import { ownerType } from "../../constants/types";

export interface StatusesInterface{
    ref: StatusesInterface | undefined,
    id:string,
    nameRU:string,
    descriptionRU:string,
    nameEN:string,
    descriptionEN:string,
    owners:ownerType[]|null,
    fuse_statuses:string|null,
    tip: string;
}

export enum StatusesActionTypes {
    FETCH_STATUS = "FETCH_STATUS",
    FETCH_STATUS_SUCCESS = "FETCH_STATUS_SUCCESS",
    FETCH_STATUS_ERROR = "FETCH_STATUS_ERROR",
}
export type StatusesState = {
    statuses:null|Array<StatusesInterface>;
    loading:boolean;
    error: null|string;
}


export interface FetchStatusesAction {
    type: StatusesActionTypes.FETCH_STATUS;
}
export interface FetchStatusesActionSuccess {
    type: StatusesActionTypes.FETCH_STATUS_SUCCESS;
    payload: Array<StatusesInterface>;
}
export interface FetchStatusesActionError {
    type: StatusesActionTypes.FETCH_STATUS_ERROR;
    payload: string;

}
export type StatusesAction = FetchStatusesAction | FetchStatusesActionSuccess | FetchStatusesActionError ;

const initialState : StatusesState = {
    statuses:null,
    loading:false,
    error: null
}
export const statusesReducer = (state = initialState,action : StatusesAction):StatusesState =>{
    switch(action.type){
        case StatusesActionTypes.FETCH_STATUS:
            return {loading: true , error: null ,statuses:null }
        case StatusesActionTypes.FETCH_STATUS_SUCCESS:
            return {loading: false , error: null ,statuses: action.payload}
        case StatusesActionTypes.FETCH_STATUS_ERROR:
            return {loading: false , error: action.payload ,statuses:null} 
        default: 
            return state
    }
}
