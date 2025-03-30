import { validationToString, validationToDate, validationToNumber } from "./validations"; // Убедитесь, что импорты корректны и такие функции существуют


const eventsListKeys = [
  { key: 'id', validation: validationToString },
  { key: "startDate", validation:validationToString },
  { key: 'endDate', validation: validationToString },
  { key: 'nameRu', validation: validationToString },
  { key: 'nameEn', validation: validationToString },
  { key: 'imgSrc', validation: validationToString },
  { key: 'link', validation: validationToString },
];

  export { eventsListKeys };

  // export const normalizeKeys = (data: any): any => {
  //   return {
  //       startDate: data.startDate,
  //       endDate: data.endDate,
  //       nameRu: data.nameRu,
  //       nameEn: data.nameEn,
  //       imgSrc: data.imgSrc,
  //       link: data.link,
  //       description: data.description,
  //   };
  // };