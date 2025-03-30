import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { searchChangeTargetRefAction } from "../../store/reducers/search-reducer";
import { useQueryClient } from "react-query";
import "./ListGuides.css";
import { ItemGuide } from "../item-guide/ItemGuide";
import { GuideTagInterface, TagsState } from "../../store/reducers/guides-tags-reducer";
import { TagsFiltersSection } from "../filters/filters-section/TagsFiltersSection";
import { GuideInterface } from "../../store/reducers/guides-reducer";

type listGuidesProps = {
    onChangeCount: Function
}

export const ListGuides:React.FC<listGuidesProps> = ({onChangeCount}) => {
    const containerRef = useRef(null);

    const dispatch = useDispatch();
    const guides = useQueryClient().getQueryData("guides") as GuideInterface[]|null;
    const tags = useQueryClient().getQueryData("tags") as GuideTagInterface[];

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
        for(let i = guides.length - 1 ; i >= 0 ;i--){
            const currentID = guides[i];

            if (searchState.value){
                if (i18n.language === "ru"){
                    if (!currentID.nameRu.toLowerCase().includes(searchState.value.toLowerCase())){
                        continue
                    }
                }
                else if (i18n.language === "en"){
                    if (!currentID.nameEn.toLowerCase().includes(searchState.value.toLowerCase())){
                        continue
                    }
                }
            }
            
            let tagMatch = true;
            for (let tag of tagsReducer.selectedTags){
                if (!currentID.tagsId.includes(tag)){
                    tagMatch = false;
                }
            }
            if (!tagMatch){
                continue
            }

            let guideTags = [] as GuideTagInterface[];
            
            if (tags){
                for (let tagId of currentID.tagsId.split(", ")){
                    for (let tag of tags){
                        if (tag.Id === tagId){
                            guideTags.push(tag)
                        }
                    }
                }
            }

            idMap.new.push(<ItemGuide animationDelay={500} tags={guideTags} entity={currentID} />);
            totalCount++;
        }

    }
    onChangeCount(totalCount);

    const filter =
    {
        type:"tags",
        data: tags,
        visible:true,
        header:t("FiltersList.header.tags")
    }

    return (
        <div className="guide-info-container">
            <TagsFiltersSection filter={filter}/>
            <ul className="guide-info-list">
                {idMap.new.length > 0 ? (
                    idMap.new.map(itemGuide => itemGuide)
                ): (
                    <p className="empty">{t("ListGuides.empty")}</p>
                )
                }
            </ul>
        </div>
    )
}