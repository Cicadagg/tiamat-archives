import { DmgTypeFilterInterface, FilterInterface, SinFilterInterface } from "../store/reducers/filter-reducer";
import { MDGift } from "../types/md-gift-interface";

export const isGiftFilterMatching = (
    filterState:FilterInterface,
    searchValue:string, 
    gift:MDGift,
    locale:string) =>{
      const {keyword,nameEN,nameRU,sin} = gift;
      const name = (locale  === "ru") ? nameRU : nameEN;

      const regex = new RegExp(searchValue, 'i');
      if(!regex.test(name)) return false; 
      const {types} = filterState;

      for(const key in types.dmgType){
        const value = types.dmgType[key as keyof DmgTypeFilterInterface];
        if(value === false)continue;
        if( key !== keyword ) return false;
      }
      
      for(const key in types.sin){
        const value = types.sin[key as keyof SinFilterInterface];
        if(value === false)continue;
        if( key !== sin) return false;
      }

      for(const key in types.md){
        const value = types.md[key];
        if(value === false)continue;
        if(keyword !== key) return false;
      }
      
      for(const key in types.tags){
          const value = types.tags[key];
          if(value === false)continue;
          if(keyword !== key) return false;
      }

    return true;
}
