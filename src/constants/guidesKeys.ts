import { validationToString, validationToDate } from "./validations"; // Убедитесь, что импорты корректны и такие функции существуют


const guidesKeys = [
    { key: "ids", validation:validationToString },
    { key: 'nameRu', validation: validationToString },
    { key: 'nameEn', validation: validationToString },
    { key: 'descriptionRu', validation: validationToString },
    { key: 'descriptionEn', validation: validationToString },
    { key: 'date', validation: validationToDate },
    { key: 'tagsId', validation: validationToString}
  ];

  export { guidesKeys };

  // export const normalizeKeys = (data: any): any => {
  //   return {
  //       ids: data.ids,
  //       nameRu: data.nameRu,
  //       nameEn: data.nameEn,
  //       descriptionRu: data.descriptionRu,
  //       descriptionEn: data.descriptionEn,
  //       date: data.date,
  //       tagsId: data.tagsId
  //   };
  // };