import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { searchChangeTargetRefAction } from "../../store/reducers/search-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { ItemEntity } from "../item-entity/ItemEntity";
import { ListSinnerBar } from "../list-sinner-bar/ListSinnerBar";
import { StatusesInterface } from "../../store/reducers/statuses-reducer";
import "./ListIds.css";

export const ListIds:React.FC = () => {
    const containerRef = useRef(null);
    const dispatch = useDispatch();
    const ids = useQueryClient().getQueryData("identities") as IdentityInterface[]|null;
    const statuses = useQueryClient().getQueryData('statuses') as StatusesInterface[];
    const filterState = useTypedSelector(state => state.filterReducer);
    const searchState = useTypedSelector(state => state.searchReducer);
    const {t,i18n} = useTranslation();

    useEffect(()=>{
        searchChangeTargetRefAction(dispatch,containerRef)
    },[])
    const idMap: {
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

    if(ids){
        for(let i = ids.length - 1 ; i >= 0 ;i--){
            const currentID = ids[i] as IdentityInterface;
            const { isNew ,imgUrl ,sinner} = currentID;
            if (!isFilterMatching(filterState,searchState,currentID,i18n.language,statuses)) continue;
            if(!!(+isNew)) idMap.new.push(<ItemEntity animationDelay={500} entity={currentID} key={imgUrl}/>);
            if(sinner in idMap){
                idMap[sinner].push(<ItemEntity animationDelay={500} entity={currentID} key={imgUrl}/>);
            }
            totalCount++;
        }
    }
        
    return (
        <section ref={containerRef} className={"list-ids"}>
        <span className={"list-ids-span"}>{`${t("ListIds.header")} (${totalCount})`}</span>
        {
           totalCount !== 0 ? <>
                {
                    Object.entries(idMap).map((entry)=>{
                        const [key,value] = entry;
                        if(!value.length) return null;
                        return <ListSinnerBar key={key} sinner={key} data={value}/> 
                    })
                }
            </>
            : <p>
                {t("ListIds.empty")}
            </p>
        }
        </section>
    )

}