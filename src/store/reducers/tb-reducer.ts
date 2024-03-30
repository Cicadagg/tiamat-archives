import { hover } from "@testing-library/user-event/dist/hover";
import { Dispatch } from "react";
import { sinType } from "../../constants/types";
import { isIdentity } from "../../tools/isIdentity";
import { EGOInterface } from "./ego-reducer";
import { IdentityInterface } from "./ids-reducer";

interface EnergyListReqInterface{
    "wrath":number,
    "lust":number,
    "sloth":number,
    "glut":number,
    "gloom":number,
    "pride":number,
    "envy":number,
}
interface EnergyListPresentInterface{
    "wrath":number,
    "lust":number,
    "sloth":number,
    "glut":number,
    "gloom":number,
    "pride":number,
    "envy":number,
}

const energyListReqInitial:EnergyListReqInterface = {
    "wrath":0,
    "lust":0,
    "sloth":0,
    "glut":0,
    "gloom":0,
    "pride":0,
    "envy":0,
}; 
const energyListPresentInitial:EnergyListPresentInterface = {
    "wrath":0,
    "lust":0,
    "sloth":0,
    "glut":0,
    "gloom":0,
    "pride":0,
    "envy":0,
} 
export interface EnergyInterface{
    "energyListReq": EnergyListReqInterface,
    "energyListPresent": EnergyListPresentInterface,
}
const EnergyInterfaceInitial:EnergyInterface ={
    "energyListReq": energyListReqInitial,
    "energyListPresent": energyListPresentInitial,
}
export interface SlotInterface{
    "identity":IdentityInterface|null,
    "ego":{
        [key: string]: EGOInterface | null;
    };
}
const SlotInterfaceInitial:SlotInterface = {
    "identity":null,
    "ego": {
        "ZAYIN":null,
        "TETH":null,
        "HE":null,
        "WAW":null,
        "ALEPH":null,
    }
}

export interface TbInterface{
    slots:SlotInterface[],
    energy: EnergyInterface,
    modalTrigger:SlotInterface|null,
    hover:null|SetHoverTbActionPayload
}


export enum TbActionTypes {
    ADD_ENTITY ="ADD_ENTITY",
    REMOVE_ENTITY ="REMOVE_ENTITY",
    RESET_ALL="RESET_ALL",
    RESET_SLOT ="RESET_SLOT",
    TRIGGER_MODAL ="TRIGGER_MODAL",
    CLOSE_MODAL ="CLOSE_MODAL",
    SET_HOVER ="SET_HOVER",
    RESET_HOVER ="RESET_HOVER",
    REMOVE_SLOT="REMOVE_SLOT",
    ADD_SLOT="ADD_SLOT",
    SET_SLOTS="SET_SLOTS"
}
export interface TriggerModalTbAction {
    type: TbActionTypes.TRIGGER_MODAL;
    payload: {slot:SlotInterface};

}
export interface CloseModalTbAction {
    type: TbActionTypes.CLOSE_MODAL;
}
export interface AddEntityTbAction {
    type: TbActionTypes.ADD_ENTITY;
    payload: {entity:IdentityInterface|EGOInterface,slot:SlotInterface};

}
export interface RemoveEntityTbAction {
    type: TbActionTypes.REMOVE_ENTITY;
    payload: {slot:SlotInterface ,entity:IdentityInterface|EGOInterface};
}
export interface ResetAllTbAction {
    type: TbActionTypes.RESET_ALL;
}
export interface ResetSlotTbAction {
    type: TbActionTypes.RESET_SLOT;
    payload: {slotIndx:number};
}

type SetHoverTbActionPayload = {type:"slot",trigger:SlotInterface}|
{type:"tag"|"sin",trigger:string}|
{type:"slot-identity",trigger:IdentityInterface}|
{type:"slot-ego",trigger:EGOInterface};

export interface SetHoverTbAction {
    type: TbActionTypes.SET_HOVER;
    payload: SetHoverTbActionPayload;
}
export interface ResetHoverTbAction {
    type: TbActionTypes.RESET_HOVER;
}
export interface RemoveSlotTbAction {
    type: TbActionTypes.REMOVE_SLOT;
}
export interface AddSlotTbAction {
    type: TbActionTypes.ADD_SLOT;
}
export interface SetSlotsTbAction {
    type: TbActionTypes.SET_SLOTS;
    payload: {slots:SlotInterface[]};
}
export type TbAction = RemoveSlotTbAction|AddSlotTbAction|RemoveEntityTbAction | 
AddEntityTbAction|ResetAllTbAction|ResetSlotTbAction|TriggerModalTbAction|CloseModalTbAction|
SetHoverTbAction|ResetHoverTbAction|SetSlotsTbAction;

const initialState : TbInterface = {
    slots: Array.from({ length: 7 }, () => ({
        ego: { ...SlotInterfaceInitial.ego },
        identity: SlotInterfaceInitial.identity,
      })),
    energy: EnergyInterfaceInitial,
    modalTrigger:null,
    hover:null
}

export const tbReducer = (state = initialState,action : TbAction):TbInterface =>{
    switch(action.type){
        case TbActionTypes.TRIGGER_MODAL:
            return { ...state, modalTrigger:action.payload.slot };
        case TbActionTypes.CLOSE_MODAL:
            return { ...state, modalTrigger:null };
        case TbActionTypes.ADD_ENTITY:
            return { ...state,...add(action.payload.entity, state,action.payload.slot) };
        case TbActionTypes.REMOVE_ENTITY:
            return {...state,...remove(action.payload.entity, state,action.payload.slot)};
        case TbActionTypes.RESET_ALL:
            return {...resetALL(state)};
        case TbActionTypes.RESET_SLOT:
            return {...state,...resetSlot(state.slots,action.payload.slotIndx,state.energy)};
        case TbActionTypes.RESET_HOVER:
            return {...state,hover:null};
        case TbActionTypes.SET_HOVER:
            return {...state,hover:{...action.payload}};
        case TbActionTypes.ADD_SLOT:
            return {...state,slots:addSlot(state.slots)};
        case TbActionTypes.REMOVE_SLOT:
            return {...state,...removeSlot(state)};
        case TbActionTypes.SET_SLOTS:
            return {...state,...setSlots(action.payload.slots)};
        default: 
            return state;
    }
}
const setSlots = (slots:SlotInterface[]) =>{
    return {slots:[...slots], energy:calculateAllEnergy(slots)};
}
const calculateAllEnergy = (slots:SlotInterface[]) =>{
    const energy:EnergyInterface = {energyListPresent:{...initialState.energy.energyListPresent},energyListReq:{...initialState.energy.energyListReq}};
    slots.forEach((slot)=>{
        if(slot.identity){
            const {skillsSin} = slot.identity;
            const sin1 = skillsSin[0];
            const sin2 = skillsSin[1];
            const sin3 = skillsSin[2];
            energy["energyListPresent"][sin1] += 3;
            energy["energyListPresent"][sin2] += 2;
            energy["energyListPresent"][sin3] += 1;
        }
        const {energyListReq} = energy;
        for(const egoType in slot.ego){
            const ego = slot.ego[egoType];
            if(ego){
                for(const key in energyListReq){
                    const value = ego[key as keyof typeof ego];
                    energyListReq[key as keyof typeof energyListReq] += value as number;
                }
            }
        }
    })
    return energy;
}
const addSlot = (slots:SlotInterface[]) => {
    slots.push({
        ego: { ...SlotInterfaceInitial.ego },
        identity: SlotInterfaceInitial.identity,
      });
    localStorage.setItem("tb-stored-slots", JSON.stringify(slots));
    return [...slots]
}
const removeSlot = (state:TbInterface) => {
    const {slots,energy} = state;
    const removedSlot = slots.pop();
    if(removedSlot){
        removeAllEGOsFromSlot(removedSlot,energy);
        removeIdentityFromSlot(removedSlot,energy);
    }
    localStorage.setItem("tb-stored-slots", JSON.stringify(slots));
    return {energy: state.energy , slots:[...slots]}
}
const resetALL = (state:TbInterface) =>{
    const slots = Array.from({ length: state.slots.length }, () => ({
        ego: { ...SlotInterfaceInitial.ego },
        identity: SlotInterfaceInitial.identity,
    }));
    localStorage.setItem("tb-stored-slots", JSON.stringify(slots));
    return {
        slots,
        energy: {
            "energyListReq": {
                "wrath":0,
                "lust":0,
                "sloth":0,
                "glut":0,
                "gloom":0,
                "pride":0,
                "envy":0,
            } ,
            "energyListPresent": {
                "wrath":0,
                "lust":0,
                "sloth":0,
                "glut":0,
                "gloom":0,
                "pride":0,
                "envy":0,
            } ,
        },
        modalTrigger:null,
        hover:null
    }
}
const resetSlot = (slots:SlotInterface[] , slotIndx:number,energy:EnergyInterface) =>{
    removeIdentityFromSlot(slots[slotIndx],energy);
    for(const key in slots[slotIndx].ego){
        removeEGOFromSlot(slots[slotIndx],energy,slots[slotIndx].ego[key]);
    }
    slots[slotIndx] = {ego:{...SlotInterfaceInitial.ego},identity:SlotInterfaceInitial.identity};
    localStorage.setItem("tb-stored-slots", JSON.stringify(slots));

    return {slots,energy};
}
const add = (entity:IdentityInterface|EGOInterface,state: TbInterface,slot:SlotInterface) =>{
    const {energy,slots} = state;
    if (isIdentity(entity)){
        removeIdentityFromSlot(slot,energy);
        addIdentityToSlot(slot,energy,entity);
    }else {
        removeEGOFromSlot(slot,energy,entity);
        addEGOToSlot(slot, energy , entity);
    }
    localStorage.setItem("tb-stored-slots", JSON.stringify(slots));

    return {energy,slots};
}
const remove = (entity:IdentityInterface|EGOInterface,state: TbInterface,slot:SlotInterface) =>{
    const {energy,slots} = state;
    if (isIdentity(entity)){
        removeIdentityFromSlot(slot,energy);
    }else {
        removeEGOFromSlot(slot,energy,entity);
    }
    localStorage.setItem("tb-stored-slots", JSON.stringify(slots));
    
    return {energy,slots};
}

const removeIdentityFromSlot = (slot:SlotInterface,energy:EnergyInterface) => {
    if(slot.identity === null) return;
    const {skillsSin} = slot.identity;
    const sin1 = skillsSin[0];
    const sin2 = skillsSin[1];
    const sin3 = skillsSin[2];
    energy["energyListPresent"][sin1] -= 3;
    energy["energyListPresent"][sin2] -= 2;
    energy["energyListPresent"][sin3] -= 1;
    slot.identity = null;
}
const addIdentityToSlot = (slot:SlotInterface,energy:EnergyInterface,identity:IdentityInterface) => {
    if(identity === null) return;
    const {skillsSin} = identity;
    const sin1 = skillsSin[0];
    const sin2 = skillsSin[1];
    const sin3 = skillsSin[2];
    energy["energyListPresent"][sin1] += 3;
    energy["energyListPresent"][sin2] += 2;
    energy["energyListPresent"][sin3] += 1;
    slot.identity = identity;

}
const removeAllEGOsFromSlot = (slot:SlotInterface,energy:EnergyInterface)=>{
    for(const key in slot.ego){
        const currEGO = slot.ego[key];
        if(currEGO) removeEGOFromSlot(slot,energy,currEGO);
    }
}
const removeEGOFromSlot = (slot:SlotInterface,energy:EnergyInterface,ego:EGOInterface|null) => {
    if(ego === null) return;
    if(slot.ego[ego.rarity as keyof typeof slot.ego] === null) return;
    const {energyListReq} = energy;
    for(const key in energyListReq){
        const value = ego[key as keyof typeof ego];
        energyListReq[key as keyof typeof energyListReq] -= value as number;
    }
    slot.ego[ego.rarity as keyof typeof slot.ego] = null;
}
const addEGOToSlot = (slot:SlotInterface,energy:EnergyInterface,ego:EGOInterface|null) => {
    removeEGOFromSlot(slot,energy,ego);
    if(ego === null) return;
    const {energyListReq} = energy;
    for(const key in energyListReq){
        const value = ego[key as keyof typeof ego];
        energyListReq[key as keyof typeof energyListReq] += value as number;
    }
    slot.ego[ego.rarity as keyof typeof slot.ego] = ego;
}
export const tbSetSlotsAction = (dispatch: Dispatch<SetSlotsTbAction>,payload:SetSlotsTbAction["payload"]) => {
    dispatch({ type: TbActionTypes.SET_SLOTS , payload })
}
export const tbAddSlotAction = (dispatch: Dispatch<AddSlotTbAction>) => {
    dispatch({ type: TbActionTypes.ADD_SLOT })
}
export const tbRemoveSlotAction = (dispatch: Dispatch<RemoveSlotTbAction>) => {
    dispatch({ type: TbActionTypes.REMOVE_SLOT})
}
export const tbSetHoverAction = (dispatch: Dispatch<SetHoverTbAction>,payload:SetHoverTbActionPayload) => {
    dispatch({ type: TbActionTypes.SET_HOVER , payload: payload})
}
export const tbResetHoverAction = (dispatch: Dispatch<ResetHoverTbAction>) => {
    dispatch({ type: TbActionTypes.RESET_HOVER })
}
export const tbAddEntityAction = (dispatch: Dispatch<AddEntityTbAction>,entity:IdentityInterface|EGOInterface,slot:SlotInterface) => {
        dispatch({ type: TbActionTypes.ADD_ENTITY , payload: {entity,slot}})
}
export const tbRemoveEntityAction = (dispatch: Dispatch<RemoveEntityTbAction>,entity:IdentityInterface|EGOInterface,slot:SlotInterface) => {
    dispatch({ type: TbActionTypes.REMOVE_ENTITY , payload: {entity,slot} })
}
export const tbResetAllAction = (dispatch: Dispatch<ResetAllTbAction>) => {
    dispatch({ type: TbActionTypes.RESET_ALL })
}
export const tbResetSlotAction = (dispatch: Dispatch<ResetSlotTbAction> ,slotIndx:number) => {
    dispatch({ type: TbActionTypes.RESET_SLOT ,payload : {slotIndx}})
}
export const tbTriggerModalAction = (dispatch: Dispatch<TriggerModalTbAction> ,slot:SlotInterface) => {
    dispatch({ type: TbActionTypes.TRIGGER_MODAL ,payload : {slot}})
}
export const tbCloseModalAction = (dispatch: Dispatch<CloseModalTbAction> ) => {
    dispatch({ type: TbActionTypes.CLOSE_MODAL })
}