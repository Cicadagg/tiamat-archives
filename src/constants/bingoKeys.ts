import { validationToString } from "./validations"; // Убедитесь, что импорты корректны и такие функции существуют


const bingoKeys = [
    { key: "ids", validation:validationToString },
    { key: 'name1', validation: validationToString },
    { key: 'name2', validation: validationToString },
    { key: 'name3', validation: validationToString },
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