import { dmgType, guardType, guardTypeExtended, sinType, normalizeGuardType } from "../constants/types";
import { EGOInterface } from "../store/reducers/ego-reducer";
import { DmgTypeFilterInterface, FilterInterface, GuardTypeFilterInterface, SinFilterInterface, SinnerFilterInterface } from "../store/reducers/filter-reducer";
import { IdentityInterface } from "../store/reducers/ids-reducer";
import { TSearchState } from "../store/reducers/search-reducer";
import { StatusesInterface } from "../store/reducers/statuses-reducer";
import { getStatusesEntityList } from "./getStatusesEntityList";
import { isIdentity } from "./isIdentity";

export const isFilterMatching = (filterState:FilterInterface,searchState:TSearchState, entity:IdentityInterface|EGOInterface,locale:string,statuses:StatusesInterface[]) =>{
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

    const isSeasonFilterAny = Object.values(types.season).some((value) => value);
    if (isSeasonFilterAny && !types.season[entity.season[0] as keyof typeof types.season]) return false;

    const isEventFilterAny = Object.values(types.event).some((value) => value);
    if (isEventFilterAny && !types.event[entity.season[1] as keyof typeof types.event]) return false;

    function updateStatusWithFuseStatuses(
        allStatuses: StatusesInterface[], // Все доступные статусы
        status: { [key: string]: number } // Объект со статусами
    ): { [key: string]: number } {
        // Создаём копию объекта status для модификации
        const updatedStatus = { ...status };
    
        // Проходим по всем id из ключей status
        for (const id of Object.keys(status)) {
            // Ищем статус с текущим id
            const foundStatus = allStatuses.find(s => s.id === id);
    
            if (foundStatus && foundStatus.fuse_statuses) {
                const fuseId = foundStatus.fuse_statuses;
    
                // Если fuseId ещё нет в объекте, добавляем его с начальным значением 0
                if (!(fuseId in updatedStatus)) {
                    updatedStatus[fuseId] = 0;
                }
            }
        }
        return updatedStatus;
    }

    if(isIdentity(entity)){
        const {guardType,guardSin,descriptionCoinEN,descriptionPassive1EN,descriptionPassive2EN,skillsSin,skillsDmgType} =entity;
        // const statusesEntity = Object.keys(getStatusesEntityList([descriptionCoinEN,descriptionPassive1EN,descriptionPassive2EN]));
        const status = getStatusesEntityList([descriptionCoinEN,descriptionPassive1EN,descriptionPassive2EN]);
        const fuseStatusesKeys = updateStatusWithFuseStatuses(statuses, status);
        const fuseStatuses = Object.keys(fuseStatusesKeys);

        for(const key in types.tags){
            const value = types.tags[key];
            if(value === false)continue;
            if(!fuseStatuses.includes(key)) return false;
        }

        if((isAnyRarityEGO||isAnyRarityIdentity) && !types.rarityIdentity[rarity as keyof typeof types.rarityIdentity]) return false;

        for(const key in types.sin){
            const value = types.sin[key as keyof SinFilterInterface];
            if(value === false) continue;
            // Check if the sin exists in either attack skills or guard skills
            const allSins = [...skillsSin];
            if (guardSin) allSins.push(...guardSin);
            if(!allSins.includes(key as sinType)) return false;
        }
        
        for(const key in types.dmgType){
            const value = types.dmgType[key as keyof DmgTypeFilterInterface];
            if(value === false)continue;
            if( !(skillsDmgType.includes(key as dmgType)) ) return false;
        }

        for(const key in types.guardType){
            const value = types.guardType[key as keyof GuardTypeFilterInterface];
            if(value === false) continue;
            const normalizedKey = normalizeGuardType(key as guardTypeExtended);
            const normalizedGuardTypes = guardType.map(gt => normalizeGuardType(gt as guardTypeExtended));
            if(!normalizedGuardTypes.includes(normalizedKey as guardType)) return false;
        }
    }else{
        const {dmgType,descriptionCoinEN,descriptionPassiveEN} = entity;
        // const statusesEntity = Object.keys(getStatusesEntityList([descriptionCoinEN,descriptionPassiveEN]));
        const status = getStatusesEntityList([descriptionCoinEN,descriptionPassiveEN]);
        const fuseStatusesKeys = updateStatusWithFuseStatuses(statuses, status);
        const fuseStatuses = Object.keys(fuseStatusesKeys);
        
        for(const key in types.tags){
            const value = types.tags[key];
            if(value === false)continue;
            if(!fuseStatuses.includes(key)) return false;
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
