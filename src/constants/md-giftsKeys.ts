import { validationToNumber, validationToSinTypes, validationToString } from "./validations";
import { MDGift } from "../types/md-gift-interface";

// Исправляем интерфейс GiftKey
interface GiftKey {
  key: keyof MDGift; // Ключи должны соответствовать свойствам MDGift
  validation: (value: unknown) => { validatedVal: unknown; isValid: boolean }; // Соответствует возвращаемому типу validation
}

// Массив ключей
const md_giftsKeys: GiftKey[] = [
  { key: 'id', validation: validationToString },
  { key: 'nameEN', validation: validationToString },
  { key: 'nameRU', validation: validationToString },
  { key: 'tier', validation: validationToNumber },
  { key: 'sin', validation: validationToSinTypes },
  { key: 'keyword', validation: validationToString },
  { key: 'grade1EN', validation: validationToString },
  { key: 'grade2EN', validation: validationToString },
  { key: 'grade3EN', validation: validationToString },
  { key: 'grade1RU', validation: validationToString },
  { key: 'grade2RU', validation: validationToString },
  { key: 'grade3RU', validation: validationToString },
  { key: 'cost', validation: validationToString },
  { key: 'obtainEN', validation: validationToString },
  { key: 'obtainRU', validation: validationToString }
];

export { md_giftsKeys };


// export const normalizeKeys = (data: any): any => {
//     return {
//         id: data["imgUrl-id"],
//         nameRU: data.nameRu,
//         nameEN: data.nameEn,
//         tier: data.tier,
//         sin: data.sin,
//         keyword: data.Keyword,
//         grade1EN: data.grade1En,
//         grade2EN: data.grade2En,
//         grade3EN: data.grade3En,
//         grade1RU: data.grade1Ru,
//         grade2RU: data.grade2Ru,
//         grade3RU: data.grade3Ru,
//         cost: data.cost,
//         obtainEN: data.obtain.obtainEn,
//         obtainRU: data.obtain.obtainRu
//     };
// };