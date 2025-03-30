import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { searchChangeTargetRefAction } from "../../store/reducers/search-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { ItemEntity } from "../item-entity/ItemEntity";
import { TierBar } from "./tier-bar/TierBar";
import { StatusesInterface } from "../../store/reducers/statuses-reducer";
import "./TierList.css"
type TRatings = {
    [key:string]:{
        data:React.ReactElement[],
        description:string
    }
}
export const TierList:React.FC = () => {
    const ids = useQueryClient().getQueryData("identities") as IdentityInterface[]|null;
    const ego = useQueryClient().getQueryData("ego") as EGOInterface[]|null;
    const statuses = useQueryClient().getQueryData('statuses') as StatusesInterface[];
    const {t,i18n} = useTranslation();
    const filterState = useTypedSelector(state => state.filterReducer);
    const searchState = useTypedSelector(state => state.searchReducer);
    const params = useParams();
    const type = params["type"] || "";
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    useEffect(()=>{
        searchChangeTargetRefAction(dispatch,containerRef)
    },[])

    const tierListClass = () =>{
        switch (type){
            case "identities":
                return "tier-list--ego-ids";
            case "ego":
                return "tier-list--ego-ids";
        }
        return "";
    }

    const tierListName = (tierListParam:string|null) =>{
        switch (tierListParam){
            case "identities":
                return t("TierList.name.identities");
            case "ego":
                return t("TierList.name.ego");
        }
        return "";
    }
    const getAllDataCount = (data:TRatings) =>{
        return Object.values(data).reduce((acc,item)=>{ acc+= item.data.length ; return acc} , 0);
    }

    const setupEGO = (ratings: TRatings) => {
        console.log('Начало сортировки EGO');
        
        ego?.forEach((item: EGOInterface, index) => {
            if (isFilterMatching(filterState, searchState, item, i18n.language, statuses)) {
                ratings[item.egoTier].data.push(<ItemEntity key={index} entity={item} />);
            }
        });
    
        console.log('Элементы до сортировки:');
        Object.keys(ratings).forEach(key => {
            console.log(`Категория: ${key}`);
            ratings[key].data.forEach((item, index) => {
                const entity = item.props.entity as EGOInterface;
                console.log(`  - ${index}: ${entity.nameRU} (rarity: ${entity.rarity || 'Нет данных'})`);
            });
        });
    
        // Сортировка по rarity внутри каждой категории
        Object.keys(ratings).forEach(key => {
            ratings[key].data.sort((a, b) => {
                const itemA = (a.props.entity as EGOInterface);
                const itemB = (b.props.entity as EGOInterface);

                const egoRarityOrder: { [key: string]: number } = {
                    ALEPH: 1,
                    WAW: 2,
                    HE: 3,
                    TETH: 4,
                    ZAYIN: 5,
                };
                
                const orderA = egoRarityOrder[itemA.rarity] || Infinity;
                const orderB = egoRarityOrder[itemB.rarity] || Infinity;
                
                return orderA - orderB;
            });
        });
    
        console.log('Элементы после сортировки:');
        Object.keys(ratings).forEach(key => {
            console.log(`Категория: ${key}`);
            ratings[key].data.forEach((item, index) => {
                const entity = item.props.entity as EGOInterface;
                console.log(`  - ${index}: ${entity.nameRU} (rarity: ${entity.rarity || 'Нет данных'})`);
            });
        });
    
        return ratings;
    }
    
    const setupIds = (ratings: TRatings) => {
        console.log('Начало сортировки Ids');
        
        ids?.forEach((item: IdentityInterface, index) => {
            if (isFilterMatching(filterState, searchState, item, i18n.language, statuses)) {
                ratings[item.idTier].data.push(<ItemEntity key={index} entity={item} />);
            }
        });
    
        console.log('Элементы до сортировки:');
        Object.keys(ratings).forEach(key => {
            console.log(`Категория: ${key}`);
            ratings[key].data.forEach((item, index) => {
                const entity = item.props.entity as IdentityInterface;
                console.log(`  - ${index}: ${entity.nameRU} (rarity: ${entity.rarity})`);
            });
        });
    
        Object.keys(ratings).forEach(key => {
            ratings[key].data.sort((a, b) => {
                const itemA = (a.props.entity as IdentityInterface);
                const itemB = (b.props.entity as IdentityInterface);
                
                // Сортировка по количеству символов 'O' в строке rarity
                const countA = itemA.rarity.split('O').length - 1;
                const countB = itemB.rarity.split('O').length - 1;
                
                return countB - countA; // Сортировка по убыванию количества 'O'
            });
        });
        
    
        console.log('Элементы после сортировки:');
        Object.keys(ratings).forEach(key => {
            console.log(`Категория: ${key}`);
            ratings[key].data.forEach((item, index) => {
                const entity = item.props.entity as IdentityInterface;
                console.log(`  - ${index}: ${entity.nameRU} (rarity: ${entity.rarity})`);
            });
        });
    
        return ratings;
    }
    
    
   
    const setupItems = (params:string) =>{
        const ratings:TRatings = {
            "SSS":{
                data:[],
                description: t(`TierList.description.${params}.SSS`)
            },
            "SS":{
                data:[],
                description: t(`TierList.description.${params}.SS`)
            },
            "S":{
                data:[],
                description: t(`TierList.description.${params}.S`)
            },
            "A":{
                data:[],
                description:t(`TierList.description.${params}.A`)
            },
            "B":{
                data:[],
                description: t(`TierList.description.${params}.B`)
            },
            "C":{
                data:[],
                description: t(`TierList.description.${params}.C`)
            },
            "Test":{
                data:[],
                description: t(`TierList.description.${params}.Test`)
            },
        };
        if(params === "ego") return setupEGO(ratings);
        return setupIds(ratings);
    }
    const setupTierlist = () => {
        if (type === "identities") return [{
            tierListParam: "identities",
            ratings: setupItems(type),
        }];
        return [{
            tierListParam: "ego",
            ratings: setupItems(type),
        }];
    }
    return (
        <section ref={containerRef} className="tier-list-container">
            {setupTierlist().map(({tierListParam,ratings} ,index)=>{
                return (
                    <section key={index} className={["tier-list" , tierListClass()].join(" ")}>
                        <h2 className="tier-list-name">{tierListName(tierListParam) + ` (${getAllDataCount(ratings)})`}</h2>
                        {!getAllDataCount(ratings) && <p className="tier-list-text-empty">{t("Filters.empty")}  </p>}
                            {Object.entries(ratings).map((entry)=>{
                                const [ratingKey , ratingValue] = entry;
                                const {data,description} = ratingValue;
                                if (data.length === 0) return null;
                                return(
                                    <TierBar count={data.length} rating={ratingKey} description={description} key={ratingKey}>
                                        <React.Fragment>{data}</React.Fragment>
                                    </TierBar>
                                )
                            })}
                    </section>
                )
            })}
        </section>
        
    )
}
