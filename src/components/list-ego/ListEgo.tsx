import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { sinnerTypes } from "../../constants/skillBasedTypes";
import { sinnerType } from "../../constants/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { searchChangeTargetRefAction } from "../../store/reducers/search-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { ItemEntity } from "../item-entity/ItemEntity";
import { ListSinnerBar } from "../list-sinner-bar/ListSinnerBar";
import "./ListEgo.css";

export const ListEgo:React.FC = () => {
    const ego = useQueryClient().getQueryData("ego") as EGOInterface[]|null;
    const filterState = useTypedSelector(state => state.filterReducer);
    const searchState = useTypedSelector(state => state.searchReducer);
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    const {t,i18n} = useTranslation();

    useEffect(()=>{
        searchChangeTargetRefAction(dispatch,containerRef)
    },[])
    const egoMap: {
        [key:string]:React.ReactNode[]
    } = {
        "new":[],
        "yi sang":[],
        "faust":[],
        "don quixote":[],
        "ryoshu":[],
        "mersault":[],
        "hong lu":[],
        "heathcliff":[],
        "ishmael":[],
        "rodion":[],
        "sinclair":[],
        "outis":[],
        "gregor":[],
    };

    let totalCount = 0;

    if(ego){
        for(let i = ego.length - 1 ; i >= 0 ;i--){
            const currentEGO = ego[i] as EGOInterface;
            const { isNew ,imgUrl ,sinner} = currentEGO;
            if (!isFilterMatching(filterState,searchState,currentEGO,i18n.language)) continue;
            if(!!(+isNew)) egoMap.new.push(<ItemEntity animationDelay={500} entity={currentEGO} key={imgUrl}/>);
            if(sinner in egoMap){
                egoMap[sinner].push(<ItemEntity animationDelay={500} entity={currentEGO} key={imgUrl}/>);
            }
            totalCount++;
        }
    }
        
    return (
        <section ref={containerRef} className={"list-ego"}>
        <span className={"list-ego-span"}>{`${t("ListEgo.header")} (${totalCount})`}</span>
        {
           totalCount !== 0 ? <>
                {
                    Object.entries(egoMap).map((entry)=>{
                        const [key,value] = entry;
                        if(!value.length) return null;
                        return <ListSinnerBar key={key} sinner={key} data={value}/> 
                    })
                }
            </>
            : <p>
                {t("ListEgo.empty")}
            </p>
        }
        </section>
    )
}