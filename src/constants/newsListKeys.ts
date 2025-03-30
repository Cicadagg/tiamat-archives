import { validationToString, validationToDate } from "./validations"; // Убедитесь, что импорты корректны и такие функции существуют


const newsListKeys = [
    { key: "startDate", validation:validationToDate },
    { key: 'endDate', validation: validationToDate },
    { key: 'imgSrc', validation: validationToString },
    { key: 'link', validation: validationToString },
  ];

  export { newsListKeys };

  // export const normalizeKeys = (data: any): any => {
  //   return {
  //       startDate: data.startDate,
  //       endDate: data.endDate,
  //       imgSrc: data.imgSrc,
  //       link: data.link
  //   };
  // };