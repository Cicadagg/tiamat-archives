import { sinnerTypes,guardTypesExtended,damageTypes,rarityEGOTypes,rarityIdentityTypes,sinTypes, tierTypes, ownerTypes } from "./skillBasedTypes";
import { dmgType, guardTypeExtended, rarityEGOType, rarityIdentityType, sinnerType, sinType, ownerType } from "./types";

export const validationToJSON = (a:unknown) => {
    try{
        const validatedVal = JSON.parse(a as string);
        return {validatedVal,isValid:true};
    }catch(e){
        return {validatedVal:null,isValid:false};
    }
}
export const validationJSON = (a: unknown): { validatedVal: any, isValid: boolean } => {
    // Проверка, что входящее значение не null и не undefined
    if (a === null || a === undefined) {
        return { validatedVal: null, isValid: false };
    }

    // Если входящее значение уже объект, возвращаем его как валидный
    if (typeof a === 'object') {
        return { validatedVal: a, isValid: true };
    }

    // Если входящее значение не строка, пробуем преобразовать
    const input = typeof a === 'string' ? a : String(a);

    try {
        // Удаляем лишние пробелы
        const trimmedInput = input.trim();

        // Проверяем, что строка начинается с { или [
        if (!(trimmedInput.startsWith('{') || trimmedInput.startsWith('['))) {
            return { validatedVal: null, isValid: false };
        }

        // Парсим JSON
        const validatedVal = JSON.parse(trimmedInput);

        // Дополнительная проверка типа распарсенного значения
        const isValidJSON = 
            (Array.isArray(validatedVal) || 
            (typeof validatedVal === 'object' && validatedVal !== null));

        return { 
            validatedVal: isValidJSON ? validatedVal : null, 
            isValid: isValidJSON 
        };
    } catch (e) {
        return { validatedVal: null, isValid: false };
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
export const parseQuotedStringsToArray  = (a: unknown) => {
    let validatedVal:string[] = [];
    let isValid = true;
    if(typeof a === "string"){
        const arr = a.split(":,");
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

export const validationToStringsArrayOrStandard = (a:unknown) => {
    if (a === "standard") {
        return { validatedVal: "standard", isValid: true };
    }
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
    return {validatedVal:a ,isValid:guardTypesExtended.includes(a as guardTypeExtended)};
}

export const validationToGuardTypesArray = (a:unknown) => {
    let validatedVal:guardTypeExtended[] = [];
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
        validatedVal = arr as guardTypeExtended[];
    } 
    return {validatedVal,isValid};
}
export const validationToSinner = (a:unknown) => {
    return {validatedVal:a ,isValid:sinnerTypes.includes(a as sinnerType)};
}
export const validationToString = (a:unknown) => {
    return {validatedVal:`${a}` ,isValid:true};
}
export const validationToStringOrNone = (a: unknown) => {
    if (a === "none") {
      return { validatedVal: "none", isValid: true };
    }
  
    return { validatedVal: `${a}`, isValid: true };
};
  
export const validationToNumber = (a:unknown) => {
    const isNumber = typeof a === "number";
    return {validatedVal: a,isValid:isNumber };
}
export const validationToDate = (a: unknown) => {
    if (a === null) return { validatedVal: null, isValid: true };
    
    if (typeof a === "number") return { validatedVal: a, isValid: true };
    
    if (typeof a === "string") {
        const jsDate = new Date(a);
        if (isNaN(jsDate.getTime())) {
            // Если строка не может быть преобразована в дату
            return { validatedVal: a, isValid: false };
        }
        const excelStartDate = new Date(1899, 11, 30);
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const daysDifference = (jsDate.getTime() - excelStartDate.getTime()) / millisecondsPerDay;
        return { validatedVal: daysDifference, isValid: true };
    }

    return { validatedVal: a, isValid: false };
};

export const validationToStatus = (a:unknown) => {
    if(a === "") return {validatedVal: null ,isValid:true };
    if(typeof a === "string") return {validatedVal: a ,isValid:true };
    return {validatedVal: a ,isValid:false };
}
export const getValidatedData = (response: unknown[][][], validationKeys: { key: string, validation: Function }[]) => {
    const result: unknown[] = [];
    response.forEach((r, index) => {
        // console.log(`Processing id: ${index}`);
        for (let i = 1; i < r.length; i++) {
            const row = r[i];
            // console.log(`Processing row: ${i} of id: ${index}`);
            const item: { [key: string]: unknown } = {};
            if (row.length < validationKeys.length) {
                console.warn(`Row ${i} has less elements than expected`);
                // continue;
            }
            let isItemValid = true;
            for (let j = 0; j < row.length; j++) {
                const currentVal = row[j];
                // console.log(`Processing element ${j} of row ${i} of id: ${index}`);
                const currentValidationKey = validationKeys[j];
                if (!currentValidationKey) break;
                const { key, validation } = currentValidationKey;
                const { validatedVal, isValid } = validation.call(validation, currentVal);
                if (!isValid) {
                    isItemValid = false;
                    console.warn(`Invalid element detected. id: ${i}, key: ${key}`);
                    break;
                }
                // console.log(`Element validated. id: ${index}, key: ${key}, value: ${validatedVal}`);
                item[key] = validatedVal;
            }
            if (isItemValid) {
                // console.log(`Row ${i} of id ${index} is valid and added to result`);
                result.push(item);
            }
        }
    });

    console.log(`Finished processing all ids. Total valid items: ${result.length}`);
    return result;
}

export const validationToUnitTypes = (a:unknown) => {
    return {validatedVal:a ,isValid:ownerTypes.includes(a as ownerType)};
}
export const validationToUnitTypesArray = (a:unknown) => {
    let validatedVal:ownerType[] = [];
    let isValid = true;
    if(typeof a === "string"){
        const arr = a.replaceAll(" " , "").split(",") ;
        for(let i = 0; i < arr.length;i++){
            const current = arr[i];
            if(!validationToUnitTypes(current).isValid){
                isValid = false 
                break;
            }
        }
        validatedVal = arr as ownerType[];
    } 
    return {validatedVal,isValid};
}