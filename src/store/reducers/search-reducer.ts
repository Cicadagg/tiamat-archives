import React, { Dispatch } from "react";

export type TSearchState = {
    value:string;
    targetRef:React.RefObject<HTMLElement>|null;
}
enum SearchActionTypes{
    SEARCH_CHANGE_VALUE = "SEARCH_CHANGE_VALUE",
    SEARCH_CHANGE_TARGETREF= "SEARCH_CHANGE_TARGETREF",
}
const initialState:TSearchState = {
    value:"",
    targetRef:null
};
type SearchChangeValueAction = {
    payload:string;
    type:SearchActionTypes.SEARCH_CHANGE_VALUE;
}
type SearchChangeTargetRefAction = {
    payload:React.RefObject<HTMLElement>|null;
    type:SearchActionTypes.SEARCH_CHANGE_TARGETREF;
}

type SearchAction = SearchChangeValueAction | SearchChangeTargetRefAction;

export const searchReducer = (state = initialState,action : SearchAction):TSearchState =>{
    switch(action.type){
        case SearchActionTypes.SEARCH_CHANGE_VALUE:
            return {...state , value:action.payload};
        case SearchActionTypes.SEARCH_CHANGE_TARGETREF:
            return{...state , targetRef:action.payload};
        default: 
            return state
    }
}

export const searchChangeValueAction = (dispatch: Dispatch<SearchChangeValueAction> , payload:string) => {
    dispatch({ type: SearchActionTypes.SEARCH_CHANGE_VALUE , payload})
}
export const searchChangeTargetRefAction = (dispatch: Dispatch<SearchChangeTargetRefAction> , payload:React.RefObject<HTMLElement>|null) => {
    dispatch({ type: SearchActionTypes.SEARCH_CHANGE_TARGETREF , payload})
}
