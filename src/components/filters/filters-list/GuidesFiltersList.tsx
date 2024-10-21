import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { damageTypes, guardTypes, rarityIdentityTypes, sinnerTypes, sinTypes } from "../../../constants/skillBasedTypes";
import { rarityEGOType } from "../../../constants/types";
import { FiltersSection } from "../filters-section/FiltersSection";
import { useQueryClient } from "react-query";
import { useFetchTags } from "../../../api/useFetchTags";
import { TagsFiltersSection } from "../filters-section/TagsFiltersSection";
import { useDispatch, useSelector } from "react-redux";
import { addTag, clearTags, fetchTags, GuideTagInterface, removeTag, TagsState } from "../../../store/reducers/guides-tags-reducer";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { apiUrl1 } from "../../../api/useFetchTags"

export const GuidesFiltersList:React.FC = () => {
    const {t} = useTranslation();
    const location = useLocation().pathname;
    const params = new URLSearchParams(useLocation().search);
    const dispatch = useDispatch();
    const tagsReducer = useTypedSelector(state => state.tagsReducer) as TagsState;

    useEffect(() => {
        fetch(apiUrl1).then(response => response.json()).then(response => {
            let tags: GuideTagInterface[] = []
            for (let tag of response.values.slice(1, response.values.length)){
                console.log(tag)
                tags.push({
                    Id: tag[0],
                    nameRu: tag[1],
                    nameEn: tag[2]
                })
            }

            //const tags = response.values.slice(1, response.values.length) as GuideTagInterface[];
            console.log(tags)
            dispatch(fetchTags(tags));
            console.log(tagsReducer.allTags)
        })
    }, [])

    const filters = [
        {
            type:"tags" ,
            data: tagsReducer.allTags,
            visible:true,
            header:t("FiltersList.header.tags")
        }
    ];
    return (
        <>
        {filters.map((filter,index)=>{
            if(!filter.visible) return null
            return  <TagsFiltersSection key={index} filter={filter}/>
        })
        }
        </>
    )
}