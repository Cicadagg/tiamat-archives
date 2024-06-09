import { validationToDamageTypes, validationToDamageTypesArray, validationToDate, validationToNumber, validationToNumbersArray, validationToRarityEGOTypes, validationToSinner, validationToSinTypes,  validationToString, validationToStringsArray, validationToTier } from "./validations";

const egoKeys = [
    { key: 'imgUrl' ,validation:validationToString},  { key: 'sinner' ,validation:validationToSinner},
    { key: 'nameEN' ,validation:validationToString},  { key: 'nameRU' ,validation:validationToString},
    { key: 'rarity',validation:validationToRarityEGOTypes},
    { key: 'season' ,validation:validationToNumber},  { key: 'egoResists' ,validation:validationToStringsArray},
    { key: 'sanity' ,validation:validationToNumbersArray},    { key: 'wrath' ,validation:validationToNumber},
    { key: 'lust' ,validation:validationToNumber},    { key: 'sloth' ,validation:validationToNumber},
    { key: 'glut' ,validation:validationToNumber},    { key: 'gloom' ,validation:validationToNumber},
    { key: 'pride' ,validation:validationToNumber},    { key: 'envy' ,validation:validationToNumber},
    { key: 'egoSin' ,validation:validationToSinTypes},  { key: 'dmgType',validation:validationToDamageTypesArray },
    { key: 'basicCoin',validation:validationToNumbersArray },  { key: 'growthPerCoin',validation:validationToNumbersArray },
    { key: 'maxCoinValue',validation:validationToNumbersArray },
    { key: 'countCoin',validation:validationToNumbersArray },
    { key: 'weightCoin',validation:validationToNumbersArray },
    { key: 'nameSkillEN' ,validation:validationToStringsArray},
     { key: 'nameSkillRU' ,validation:validationToStringsArray},
    { key: 'descriptionCoinEN' ,validation:validationToString},
     { key: 'descriptionCoinRU' ,validation:validationToString},{ key: 'namePassiveEN',validation:validationToString },
    { key: 'namePassiveRU',validation:validationToString }, { key: 'descriptionPassiveEN' ,validation:validationToString},
    { key: 'descriptionPassiveRU' ,validation:validationToString},
    { key: 'egoTier',validation:validationToTier }, 
    { key: 'releaseDate',validation:validationToDate },
    { key: 'isNew',validation:validationToString },
];
export {egoKeys}