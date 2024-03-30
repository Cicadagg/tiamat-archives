import { dmgType, sinType } from "../constants/types";
import { EGOInterface } from "../store/reducers/ego-reducer";
import { DmgTypeFilterInterface, FilterInterface, GuardTypeFilterInterface, SinFilterInterface, SinnerFilterInterface } from "../store/reducers/filter-reducer";
import { IdentityInterface } from "../store/reducers/ids-reducer";
import { TSearchState } from "../store/reducers/search-reducer";
import { getStatusesEntityList } from "./getStatusesEntityList";
import { isIdentity } from "./isIdentity";

export const isFilterMatching = (filterState:FilterInterface,searchState:TSearchState, entity:IdentityInterface|EGOInterface,locale:string) =>{
    const {types} = filterState;
    const searchValue = searchState.value;
    const {sinner,rarity} = entity;
    const nameKey = `name${locale.toUpperCase()}` as keyof typeof entity;
    const name = entity[nameKey] as string;
    const regex = new RegExp(searchValue, 'i');
    if(!regex.test(name)) return false; 

    const isSinnerFilterAny = Object.values(types.sinner).some((value) => value);
    if (isSinnerFilterAny && !types.sinner[sinner as keyof SinnerFilterInterface]) return false;

    let isAnyRarityIdentity = Object.values(types.rarityIdentity).some((value) => value);
    let isAnyRarityEGO = Object.values(types.rarityEGO).some((value) => value);

    if(isIdentity(entity)){
        const {guardType,sinGuard,descriptionCoinEN,descriptionPassive1EN,descriptionPassive2EN,skillsSin,skillsDmgType} =entity;
        const statuses = Object.keys(getStatusesEntityList([descriptionCoinEN,descriptionPassive1EN,descriptionPassive2EN]));

        for(const key in types.tags){
            const value = types.tags[key];
            if(value === false)continue;
            if(!statuses.includes(key)) return false;
        }

        if((isAnyRarityEGO||isAnyRarityIdentity) && !types.rarityIdentity[rarity as keyof typeof types.rarityIdentity]) return false;

        for(const key in types.sin){
            const value = types.sin[key as keyof SinFilterInterface];
            if(value === false)continue;
            if( !([...skillsSin,sinGuard].includes(key as sinType)) ) return false;
        }
        
        for(const key in types.dmgType){
            const value = types.dmgType[key as keyof DmgTypeFilterInterface];
            if(value === false)continue;
            if( !(skillsDmgType.includes(key as dmgType)) ) return false;
        }

        const isGuardTypeAny = Object.values(types.guardType).some((value) => value);
        if (isGuardTypeAny && !types.guardType[guardType as keyof GuardTypeFilterInterface]) return false;

    }else{
        const {dmgType,descriptionCoinEN,descriptionPassiveEN} = entity;
        const statuses = Object.keys(getStatusesEntityList([descriptionCoinEN,descriptionPassiveEN]));
        
        for(const key in types.tags){
            const value = types.tags[key];
            if(value === false)continue;
            if(!statuses.includes(key)) return false;
        }
        
        if((isAnyRarityEGO||isAnyRarityIdentity) && !types.rarityEGO[rarity as keyof typeof types.rarityEGO]) return false;

        let activeSins = Object.entries(types.sin).map((value) => {
            const [sinType , isActive] = value;
            if(isActive) return sinType;
        });
        if(activeSins.length){
            const typedActiveSins = activeSins as string[];
            const isActiveSins = typedActiveSins.every((value) => {
                return entity[value as keyof EGOInterface] !== 0;
            }) 
            if(!isActiveSins) return false;
        } 

        for(const key in types.dmgType){
            const value = types.dmgType[key as keyof DmgTypeFilterInterface];
            if(value === false) continue;
            let isValid = false;
            for(let i = 0 ; i < dmgType.length;i++){
                const currDmgType = dmgType[i];
                if( currDmgType === (key as dmgType) ) isValid = true;
            }
            if(!isValid) return false;
        }
        
    }

   
    return true;
}
