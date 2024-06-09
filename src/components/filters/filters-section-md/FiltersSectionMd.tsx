import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { damageTypes, tagsIds } from "../../../constants/skillBasedTypes";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { filterChangeTypeAction, filterClearSectionAction } from "../../../store/reducers/filter-reducer";
import { StatusesInterface } from "../../../store/reducers/statuses-reducer";
import { EraserSVG } from "../../svg/EraserSvg";
import { FilterButton } from "../filter-button/FilterButton";

type TFilter = {
    type:string ,
    imgsFolder:string|null,
    imgExtension:string,
    data:string[],
}

export const FiltersSectionMd:React.FC = () => {
    const filterState = useTypedSelector(state => state.filterReducer);
    const statuses = useQueryClient().getQueryData("statuses") as StatusesInterface[]|null;

    const {t,i18n} = useTranslation();    
    const dispatch = useDispatch();
    const mdFiltersData:TFilter[] = [{
        type:"tags" ,
        imgsFolder:"tags",
        imgExtension:".webp",
        data:tagsIds,
    },{
        type:"dmgType" ,
        imgsFolder:"dmg-type",
        imgExtension:".png",
        data:damageTypes,
    },{
        type:"md" ,
        imgsFolder:"md-filter",
        imgExtension:".png",
        data:["none"],
    }];
    let countActive = 0;
    const handleFilterChange = (key:string) =>{
        filterChangeTypeAction(dispatch,key);
    }
    const handleClearSection = () => {
        filterClearSectionAction(dispatch,"tags");
        filterClearSectionAction(dispatch,"dmgType");
    };
    return <section className="filters-section">
    {
        mdFiltersData.map((dataMd,index)=>{
            const {data,imgExtension,imgsFolder,type} = dataMd;
           
            return <React.Fragment key={index}>
            {
                data.map((subtype)=>{
                    let currentType = filterState.types[type];
                    let isTypeActive = currentType[subtype as keyof typeof currentType];
                    const status = statuses?.find(s=>s.id === subtype);

                    const nameKey = `name${i18n.language.toUpperCase()}` as keyof typeof status;
                    const name = status ? status[nameKey] as string : t(`FiltersSection.${subtype}`);
                    if(isTypeActive) countActive++;
                    return <FilterButton
                    name={name}
                    handleFilterChange={()=>handleFilterChange(subtype)} 
                    imgSrc={`${process.env.PUBLIC_URL}/images/${imgsFolder}/${subtype}${imgExtension}`}
                    isTypeActive={isTypeActive}
                    type={subtype}
                    key={subtype} />
                })
            }
            </React.Fragment>

        })
    }
    
    <header>
        {t("FiltersSectionMd.header")}
        {countActive >= 1 && 
        <button 
        className="filters-clear-section" 
        onClick={()=>handleClearSection()}>
            <EraserSVG/>
        </button>}
    </header>
    </section>
}