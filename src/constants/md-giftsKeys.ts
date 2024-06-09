import { validationToNumber, validationToSinTypes, validationToString} from "./validations";

const md_giftsKeys = [
    { key: 'id' ,validation:validationToString},
    { key: 'nameEN',validation:validationToString},
    { key: 'nameRU' ,validation:validationToString},    
    { key: 'tier' ,validation:validationToNumber},
    { key: 'sin' ,validation:validationToSinTypes},    
    { key: 'keyword' ,validation:validationToString},    
    { key: 'grade1EN',validation:validationToString},
    { key: 'grade2EN',validation:validationToString},
    { key: 'grade3EN',validation:validationToString},
    { key: 'grade1RU',validation:validationToString},
    { key: 'grade2RU',validation:validationToString},
    { key: 'grade3RU',validation:validationToString},
    { key: 'cost',validation:validationToString},
    { key: 'obtainEN',validation:validationToString},
    { key: 'obtainRU',validation:validationToString},
];

export {md_giftsKeys}