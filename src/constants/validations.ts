import { sinnerTypes ,guardTypes ,damageTypes,rarityEGOTypes,rarityIdentityTypes,sinTypes, tierTypes} from "./skillBasedTypes";
import { dmgType, guardType, rarityEGOType, rarityIdentityType, sinnerType, sinType } from "./types";
export const validationToJSON = (a:unknown) => {
    try{
        const validatedVal = JSON.parse(a as string);
        return {validatedVal,isValid:true};
    }catch(e){
        return {validatedVal:null,isValid:false};
    }
}
export const validationToNumbersArray = (a:unknown) => {
    let validatedVal:number[] = [];
    let isValid = true;
    if(typeof a === "string"){
        const arr = a.split(",");
        for(let i = 0; i < arr.length;i++){
            const current = +arr[i];
            if(isNaN(current)) continue;
            validatedVal.push(current); 
        }
    }else if (typeof a === "number"){
        validatedVal.push(a); 
    }
    return {validatedVal,isValid};
}
export const validationToNumbersArraySemicolon = (a:unknown) => {
    let validatedVal:number[] = [];
    let isValid = true;
    if(typeof a === "string"){
        const arr = a.split(";");
        for(let i = 0; i < arr.length;i++){
            const current = +arr[i];
            if(isNaN(current)) continue;
            validatedVal.push(current); 
        }
    }else if (typeof a === "number"){
        validatedVal.push(a); 
    }
    return {validatedVal,isValid};
}
export const validationToStringsArrayVerticalBar = (a:unknown) => {
    let validatedVal:string[] = [];
    let isValid = true;
    if(typeof a === "string"){
        const arr = a.split("|");
        for(let i = 0; i < arr.length;i++){
            const current = arr[i];
            if(typeof current !== "string"){
                isValid = false 
                break;
            }
        }
        validatedVal = arr;
    } 
    return {validatedVal,isValid};
}
export const validationToStringsArray = (a:unknown) => {
    let validatedVal:string[] = [];
    let isValid = true;
    if(typeof a === "string"){
        const arr = a.split(",");
        for(let i = 0; i < arr.length;i++){
            const current = arr[i];
            if(typeof current !== "string"){
                isValid = false 
                break;
            }
        }
        validatedVal = arr;
    } 
    return {validatedVal,isValid};
}

export const validationToTier = (a:unknown) => {
    return {validatedVal:a ,isValid:tierTypes.includes(a as string)};
}
export const validationToSinTypesArray = (a:unknown) => {
    let validatedVal:sinType[] = [];
    let isValid = true;
    if(typeof a === "string"){
        const arr = a.replaceAll(" " , "").split(",") ;
        for(let i = 0; i < arr.length;i++){
            const current = arr[i];
            if(!validationToSinTypes(current).isValid){
                isValid = false 
                break;
            }
        }
        validatedVal = arr as sinType[];
    } 
    return {validatedVal,isValid};
}
export const validationToSinTypes = (a:unknown) => {
    return {validatedVal:a ,isValid:sinTypes.includes(a as sinType)};
}
export const validationToRarityIdentityTypes = (a:unknown) => {
    return {validatedVal:a ,isValid:rarityIdentityTypes.includes(a as rarityIdentityType)};
}
export const validationToRarityEGOTypes = (a:unknown) => {
    return {validatedVal:a ,isValid:rarityEGOTypes.includes(a as rarityEGOType)};
}
export const validationToDamageTypes = (a:unknown) => {
    return {validatedVal:a ,isValid:damageTypes.includes(a as dmgType)};
}
export const validationToDamageTypesArray = (a:unknown) => {
    let validatedVal:dmgType[] = [];
    let isValid = true;
    if(typeof a === "string"){
        const arr = a.replaceAll(" " , "").split(",") ;
        for(let i = 0; i < arr.length;i++){
            const current = arr[i];
            if(!validationToDamageTypes(current).isValid){
                isValid = false 
                break;
            }
        }
        validatedVal = arr as dmgType[];
    } 
    return {validatedVal,isValid};
}

export const validationToGuardTypes = (a:unknown) => {
    return {validatedVal:a ,isValid:guardTypes.includes(a as guardType)};
}

export const validationToGuardTypesArray = (a:unknown) => {
    let validatedVal:guardType[] = [];
    let isValid = true;
    if(typeof a === "string"){
        const arr = a.replaceAll(" " , "").split(",") ;
        for(let i = 0; i < arr.length;i++){
            const current = arr[i];
            if(!validationToGuardTypes(current).isValid){
                isValid = false 
                break;
            }
        }
        validatedVal = arr as guardType[];
    } 
    return {validatedVal,isValid};
}
export const validationToSinner = (a:unknown) => {
    return {validatedVal:a ,isValid:sinnerTypes.includes(a as sinnerType)};
}
export const validationToString = (a:unknown) => {
    return {validatedVal:`${a}` ,isValid:true};
}
export const validationToNumber = (a:unknown) => {
    const isNumber = typeof a === "number";
    return {validatedVal: a,isValid:isNumber };
}
export const validationToDate = (a:unknown) => {
    if(typeof a === "number") return {validatedVal: a ,isValid:true };
    if(typeof a === "string"){
        const jsDate = new Date(a);
        const excelStartDate = new Date(1899, 11, 30);
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const daysDifference = (jsDate.getTime() - excelStartDate.getTime()) / millisecondsPerDay;
        return {validatedVal: daysDifference ,isValid:true };
    }
    return {validatedVal: a ,isValid:false };
}
export const validationToStatus = (a:unknown) => {
    if(a === "") return {validatedVal: null ,isValid:true };
    if(typeof a === "string") return {validatedVal: a ,isValid:true };
    return {validatedVal: a ,isValid:false };
}
export const getValidatedData = (response:unknown[][][],validationKeys:{key:string,validation:Function}[]) =>{
    const result:unknown[] = [];
    response.forEach(r => {
        for(let i = 1 ; i < r.length;i++){
            const row = r[i];
            const item:{[key:string]:unknown} = {};
            if(row.length < validationKeys.length){
                continue;
            } 
            let isItemValid = true;
            for(let j = 0 ; j < row.length;j++){
                const currentVal = row[j];
                const currentValidationKey = validationKeys[j];
                if(!currentValidationKey) break;
                const {key,validation} = currentValidationKey;
                const {validatedVal ,isValid} = validation.call(validation ,currentVal);
                if(!isValid){
                    isItemValid = false;
                    console.log(`${i} id is not valid key: ${key}`);
                    break;
                }
                item[key] = validatedVal;
            }
            if (isItemValid) result.push(item);
        }
    })
    
    return result;
} 