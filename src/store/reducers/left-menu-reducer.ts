import { Dispatch } from "react";
import { AnyAction } from "redux";

const initialState = false;

export const leftMenuReducer = (state = initialState,action : AnyAction):boolean =>{
    switch(action.type){
        case "LEFT_MENU_CHANGE_LAYOUT":
            return action.payload;
        default: 
            return state
    }
}

export const leftMenuChangeLayoutAction = (dispatch: Dispatch<AnyAction> , payload:boolean) => {
    dispatch({ type: "LEFT_MENU_CHANGE_LAYOUT" , payload})
}
