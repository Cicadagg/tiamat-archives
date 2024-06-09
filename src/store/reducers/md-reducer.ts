import { Dispatch } from "redux";

export type MDState = {
    selectedGiftId:string|null
};

export enum MDActionTypes {
    MD_SELECT_GIFT = "MD_SELECT_GIFT",
}

export interface MD_SELECT_GIFT {
    type: MDActionTypes.MD_SELECT_GIFT;
    payload:string|null
}

export type MDAction = MD_SELECT_GIFT;

const initialState : MDState = {
    selectedGiftId:null
};

export const mdReducer = (state = initialState,action : MDAction):MDState =>{
    switch(action.type){
        case MDActionTypes.MD_SELECT_GIFT:
            return {
                selectedGiftId:action.payload
            }
        default: 
            return state
    }
}

export const mdSelectGiftIdAction = (dispatch: Dispatch<MD_SELECT_GIFT>,payload:string|null) => {
    dispatch({ type: MDActionTypes.MD_SELECT_GIFT , payload})
}

