import { validationToString} from "./validations";

const statusesKeys = [
    { key: 'id' ,validation:validationToString},
    { key: 'nameRU' ,validation:validationToString},    { key: 'descriptionRU',validation:validationToString},
    { key: 'unit' ,validation:validationToString},
    { key: 'nameEN' ,validation:validationToString},    { key: 'descriptionEN',validation:validationToString},
   
];

export {statusesKeys}