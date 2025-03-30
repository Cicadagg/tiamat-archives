import { validationJSON, validationToString, validationToNumber } from "./validations";

const md_eventsKeys = [
    { key: 'id' ,validation:validationToString},
    { key: 'abnoEN' ,validation:validationToString},    
    { key: 'abnoRU',validation:validationToString},
    { key: 'choiceEN' ,validation:validationJSON},
    { key: 'choiceRU' ,validation:validationJSON},
    { key: 'order' ,validation:validationToNumber},
];

export {md_eventsKeys}

// export const normalizeKeys = (data: any): any => {
//     return {
//         id: data["imgUrl-id"],
//         abnoEN: data.abnoEn,
//         abnoRU: data.abnoRu,
//         choiceEN: data.choiceEn,
//         choiceRU: data.choiceRu,
//         order: data.order
//     };
// };