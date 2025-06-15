import { validationToString, validationToStringOrNone, validationToUnitTypesArray } from "./validations";

const statusesKeys = [
    { key: 'id' ,validation:validationToString },
    { key: 'nameRU' ,validation:validationToString },    { key: 'descriptionRU',validation:validationToString },
    { key: 'nameEN' ,validation:validationToString },    { key: 'descriptionEN',validation:validationToString },
    { key: 'owners' ,validation:validationToUnitTypesArray },
    { key: 'fuse_statuses' ,validation:validationToStringOrNone },
    { key: 'tip' ,validation:validationToString }
];

export {statusesKeys}

// export const normalizeKeys = (data: any): any => {
//     return {
//         id: data.id,
//         nameRU: data.nameRu,
//         descriptionRU: data.descriptionRu,
//         nameEN: data.nameEn,
//         descriptionEN: data.descriptionEn,
//         owners: data.owners,
//         fuse_statuses: data.fuse_statuses
//     };
// };