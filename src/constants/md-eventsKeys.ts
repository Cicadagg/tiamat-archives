import { validationToJSON, validationToString} from "./validations";

const md_eventsKeys = [
    { key: 'id' ,validation:validationToString},
    { key: 'abnoEN' ,validation:validationToString},    
    { key: 'abnoRU',validation:validationToString},
    { key: 'choiceEN' ,validation:validationToJSON},
    { key: 'choiceRU' ,validation:validationToJSON},    
];

export {md_eventsKeys}