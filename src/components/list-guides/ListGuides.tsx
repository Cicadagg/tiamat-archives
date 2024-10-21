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
import "./ListGuides.css";
import { GuideInterface } from "../../store/reducers/guides-reducer";
import { ItemGuide } from "../item-guide/ItemGuide";
import { isGuide } from "../../tools/isguide";
import { TagsState } from "../../store/reducers/guides-tags-reducer";

export const ListGuides:React.FC = () => {
    const containerRef = useRef(null);

    const dispatch = useDispatch();

    const guides = useQueryClient().getQueryData("guides") as any[];

    const tagsReducer = useTypedSelector(state => state.tagsReducer) as TagsState;
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

    if(guides){
        console.log(tagsReducer)
        console.log(tagsReducer.selectedTags)
        for(let i = guides.length - 1 ; i >= 0 ;i--){
            const currentID = guides[i];
            const { isNew ,imgUrl ,sinner} = currentID;
   
            if (searchState.value){
                if (!currentID.nameRu.toLowerCase().includes(searchState.value.toLowerCase())){
                    continue
                }
            }
            
            if (tagsReducer.selectedTags.length > 0){
                let tagMatch = false;
                for (let tag of tagsReducer.selectedTags){
                    if (currentID.tagsId.includes(tag)){
                        tagMatch = true;
                    }
                }
                if (!tagMatch){
                    continue
                }
            }

            let guideTags = [];

            for (let tagId of currentID.tagsId.split(", ")){
                for (let tag of tagsReducer.allTags){
                    if (tag.Id === tagId){
                        guideTags.push(tag)
                    }
                }
            }

            console.log(guideTags)

            idMap.new.push(<ItemGuide animationDelay={500} tags={guideTags} entity={currentID} />);
            totalCount++;
        }
    }

    return (
        <section ref={containerRef} className={"list-ids"}>
        <span className={"list-ids-span"}>{`${t("ListGuides.header")} (${totalCount})`}</span>
        {
           totalCount !== 0 ? <>
                {
                    idMap.new.map((entry)=>{
                        return entry; 
                    })
                }
            </>
            : <p>
                {t("ListGuides.empty")}
            </p>
        }
        </section>
    )

}