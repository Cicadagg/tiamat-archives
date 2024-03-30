import { Dispatch } from "react";
import { damageTypes,guardTypes,rarityEGOTypes,rarityIdentityTypes,sinnerTypes,sinTypes,tagsIds } from "../../constants/skillBasedTypes";
import { sinnerType, sinType ,dmgType,guardType,rarityEGOType,rarityIdentityType} from "../../constants/types";
export type SinFilterInterface = {
    [key in sinType]:boolean;
}
export type DmgTypeFilterInterface = {
    [key in dmgType]:boolean;
}
export type GuardTypeFilterInterface = {
    [key in guardType]:boolean;
}
export type TagsFilterInterface = {
    [key:string]:boolean;
}
export type SinnerFilterInterface = {
    [key in sinnerType]: boolean;
};
export type SinnerRarityFilterInterface = {
    [key in rarityIdentityType]: boolean;
};
export type EGORarityFilterInterface = {
    [key in rarityEGOType]: boolean;
};
export type FilterInterface = {
    types:{
        [key : string]:{[key:string]:boolean};
    } & {
        sin:SinFilterInterface,
        dmgType:DmgTypeFilterInterface,
        guardType:GuardTypeFilterInterface,
        tags:TagsFilterInterface,
        sinner:SinnerFilterInterface;
        rarityIdentity:SinnerRarityFilterInterface;
        rarityEGO:EGORarityFilterInterface;
    }
}
export enum FilterActionTypes {
    CHANGE_TYPE_FILTER = "CHANGE_TYPE_FILTER",
    CLEAR_SECTION_FILTER = "CLEAR_SECTION_FILTER",
    RESET_ALL_FILTER = "RESET_ALL_FILTER"
}

export interface ChangeTypeFilterAction {
    type: FilterActionTypes.CHANGE_TYPE_FILTER;
    payload: string;
}
export interface ResetAllFilterAction {
    type: FilterActionTypes.RESET_ALL_FILTER;
}
export interface ClearSectionFilterAction {
    type: FilterActionTypes.CLEAR_SECTION_FILTER;
    payload: string;
}
export type FilterAction = ChangeTypeFilterAction|ClearSectionFilterAction|ResetAllFilterAction;

const initStateParam = <T extends string|number|symbol>(keys: T[]): { [key in T]: boolean } => { 
    let obj: { [key in T]: boolean } = {} as { [key in T]: boolean };
    keys.forEach(key=>{
        obj[key] = false;
    })
    return obj;
}
const initialTypes = {
    dmgType:initStateParam(damageTypes),
    guardType:initStateParam(guardTypes),
    sin:initStateParam(sinTypes),
    tags:initStateParam(tagsIds),
    sinner:initStateParam(sinnerTypes),
    rarityIdentity:initStateParam(rarityIdentityTypes),
    rarityEGO:initStateParam(rarityEGOTypes),
}
const initialState : FilterInterface = {
    types:initialTypes
}


export const filterReducer = (state = initialState,action : FilterAction):FilterInterface =>{
    switch(action.type){
        case FilterActionTypes.RESET_ALL_FILTER:
            return { ...resetAll(state) };
        case FilterActionTypes.CHANGE_TYPE_FILTER:
            return { ...applyFilter(action.payload, state) };
        case FilterActionTypes.CLEAR_SECTION_FILTER:
            return { ...clearSection(action.payload, state) };
        default: 
            return state
    }
}

const applyFilter = (payload: string, state: FilterInterface) => {
    const { types } = state;
    const {tags} = types;
    let keyExists = false;
    for (const key in types) {
        const current = types[key];
        if (payload in current) {
            const currentWithKey = current as { [key: string]: boolean };
            currentWithKey[payload] = !currentWithKey[payload];
            keyExists =true;
            return state;
        }
    }
    if(!keyExists) tags[payload] = true;
    return state;
};
const resetAll = (state: FilterInterface) =>{
    const {types} = state;
    for(const key in types) clearSection(key,state);
    return state;
}
const clearSection = (payload: string, state: FilterInterface) => {
    const { types } = state;
    if(payload in types){
        const type = types[payload]
        for (const key in type) type[key as keyof typeof type] = false;
    }
    return state;
}
export const filterResetAllAction = (dispatch: Dispatch<ResetAllFilterAction>) => {
    dispatch({ type: FilterActionTypes.RESET_ALL_FILTER })
}
export const filterChangeTypeAction = (dispatch: Dispatch<ChangeTypeFilterAction>,payload:string) => {
    dispatch({ type: FilterActionTypes.CHANGE_TYPE_FILTER , payload})
}
export const filterClearSectionAction = (dispatch: Dispatch<ClearSectionFilterAction>,payload:string) => {
    dispatch({ type: FilterActionTypes.CLEAR_SECTION_FILTER , payload})
}
