import { FilterInterface } from "../store/reducers/filter-reducer";
import { MDGift } from "../types/md-gift-interface";

export const isGiftFilterMatching = (
  filterState:FilterInterface,
  searchValue:string, 
  gift:MDGift,
  locale:string) =>{
    const {keyword,nameEN,nameRU,sin,grade1EN,grade2EN,grade3EN} = gift;
    const name = (locale  === "ru") ? nameRU : nameEN;

    const regex = new RegExp(searchValue, 'i');
    if(!regex.test(name)) return false; 
    const {types} = filterState;

    // Проверка sin
    const activeSins = Object.entries(types.sin)
      .filter(([_, value]) => value === true)
      .map(([key, _]) => key);
    if (activeSins.length > 0 && !activeSins.includes(sin)) return false;

    // Объединенная проверка ключевых слов (dmgType, md, tags)
    const activeKeywords = [
      ...Object.entries(types.dmgType)
        .filter(([_, value]) => value === true)
        .map(([key, _]) => key),
      ...Object.entries(types.md)
        .filter(([_, value]) => value === true)
        .map(([key, _]) => key),
      ...Object.entries(types.tags)
        .filter(([_, value]) => value === true)
        .map(([key, _]) => key)
    ];

    // Проверка ключевых слов в keyword и описаниях апгрейдов
    const giftDescriptions = [
      keyword, 
      grade1EN || '', 
      grade2EN || '', 
      grade3EN || ''
    ];

    const hasMatchingKeyword = activeKeywords.some(activeKey => 
      giftDescriptions.some(desc => desc.toLowerCase().includes(activeKey.toLowerCase()))
    );

    // Если есть активные ключевые слова, но текущий гифт не подходит ни под одно
    if (activeKeywords.length > 0 && !hasMatchingKeyword) return false;

    return true;
}
