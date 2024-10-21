import { dmgType, guardType, sinType } from "../../constants/types";


export interface GuideInterface{
    ids: any,
    nameRu: any
    nameEn: any
    descriptionRu:any,
    descriptionEn:any,
    date: any,
    tagsId: any
}

export enum IdsActionTypes {
    FETCH_IDS = "FETCH_IDS",
    FETCH_IDS_SUCCESS = "FETCH_IDS_SUCCESS",
    FETCH_IDS_ERROR = "FETCH_IDS_ERROR",
}
export interface IdsState {
    ids:null|Array<GuideInterface>;
    loading:boolean;
    error: null|string;
}

export interface FetchIdsAction {
    type: IdsActionTypes.FETCH_IDS;
}
export interface FetchIdsActionSuccess {
    type: IdsActionTypes.FETCH_IDS_SUCCESS;
    payload: Array<GuideInterface>;
}
export interface FetchIdsActionError {
    type: IdsActionTypes.FETCH_IDS_ERROR;
    payload: string;

}
export type IdsAction = FetchIdsAction | FetchIdsActionError | FetchIdsActionSuccess ;

const initialState : IdsState = {
    ids:null,
    loading:false,
    error: null
}

export const idsReducer = (state = initialState,action : IdsAction):IdsState =>{
    switch(action.type){
        case IdsActionTypes.FETCH_IDS:
            return {loading: true , error: null ,ids:null }
        case IdsActionTypes.FETCH_IDS_SUCCESS:
            return {loading: false , error: null ,ids: action.payload}
        case IdsActionTypes.FETCH_IDS_ERROR:
            return {loading: false , error: action.payload ,ids:null} 
        default: 
            return state
    }
}

//export const fetchIdsAction = (payload) => ({type:IdsActionTypes.FETCH_IDS,payload});

