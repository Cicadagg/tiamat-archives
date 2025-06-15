import {validationToString} from "./validations"; // Убедитесь, что импорты корректны и такие функции существуют
  
  const tagsKeys = [
    { key: "Id", validation:validationToString },
    { key: "nameRu", validation:validationToString },
    { key: "nameEn", validation:validationToString },
  ];
  
  export { tagsKeys };
  
// export const normalizeKeys = (data: any): any => {
//   return {
//       Id: data.Id,
//       nameRu: data.nameRu,
//       nameEn: data.nameEn,
//   };
// };