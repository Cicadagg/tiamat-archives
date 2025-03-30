import { validationToString } from "./validations"; // Убедитесь, что импорты корректны и такие функции существуют


const bingoKeys = [
    { key: "ids", validation:validationToString },
    { key: 'name', validation: validationToString },
    { key: 'Green', validation: validationToString },
    { key: 'Red', validation: validationToString },
  ];

  export { bingoKeys };

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