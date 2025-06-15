import React, { Dispatch } from "react";

type TMobileModalState = {
    trigger:React.ReactNode|null;
}
type SetMobileModalTriggerAction = {
    type:"Set_Mobile_Modal_Trigger",
    payload:React.ReactNode|null,
}
const initialState = {
    trigger:null
};
type MobileModalActions = SetMobileModalTriggerAction;
export const mobileModalReducer = (state = initialState,action : MobileModalActions):TMobileModalState =>{
    switch(action.type){
        case "Set_Mobile_Modal_Trigger":
            return {trigger:action.payload}
        default: 
            return state
    }
}

export const setMobileModalTrigger = (dispatch: Dispatch<SetMobileModalTriggerAction> , payload:React.ReactNode|null) => {
    dispatch({ type: "Set_Mobile_Modal_Trigger" , payload})
}
