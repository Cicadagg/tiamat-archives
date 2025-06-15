import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { tagsIds } from "../../../constants/skillBasedTypes";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { filterChangeTypeAction, filterClearSectionAction } from "../../../store/reducers/filter-reducer";
import { StatusesInterface} from "../../../store/reducers/statuses-reducer";
import { EraserSVG } from "../../svg/EraserSvg";
import { FilterButton } from "../filter-button/FilterButton";
import { useQueryClient } from "react-query";
import { ownerType } from "../../../constants/types";

type FiltersSection2Props = {
    isIdentityTeamBuilder?: string;
};

export const FiltersSection2:React.FC<FiltersSection2Props> = ({ isIdentityTeamBuilder }) => {
    const statuses = useQueryClient().getQueryData('statuses') as StatusesInterface[];
    const filterState = useTypedSelector(state => state.filterReducer);
    const location = useLocation().pathname;
    const [isAllFiltersShown,setIsAllFiltersShown] = useState(false);
    const [filterData, setFilterData] = useState<Array<undefined|string>>(tagsIds);
    const dispatch = useDispatch();
    const handleFilterChange = (key:string) =>filterChangeTypeAction(dispatch,key);
    const handleClearSection = (section:string) =>  filterClearSectionAction(dispatch,section);
    const {t,i18n} = useTranslation();
    let countActive = 0;

    useEffect(() => {
        const getStatusesByOwner = (owner: ownerType) => 
            statuses?.filter(s => s.owners?.includes(owner))?.map(s => s.id) || [] as string[];

        let newStatuses: string[] = tagsIds;
        if (isAllFiltersShown) {
            if (location.includes("/tierlist/identities") || location.includes("/identities")) {
                newStatuses = getStatusesByOwner("sinner");
            } else if (location.includes("/tierlist/ego") || location.includes("/ego")) {
                newStatuses = getStatusesByOwner("ego");
            } else if (location.includes("/teambuilder") && (isIdentityTeamBuilder === "identity")) {
                newStatuses = getStatusesByOwner("sinner");
            } else if (location.includes("/teambuilder") && (isIdentityTeamBuilder !== "identity")) {
                newStatuses = getStatusesByOwner("ego");
            }
        }

        setFilterData(newStatuses);
    }, [isAllFiltersShown, location, statuses, isIdentityTeamBuilder]);
   
    const type = "tags";
    if(location.includes("/mirror-dungeon")) return null;

    return <section className={`filters-section ${isAllFiltersShown && "section-expanded"}`}>
    {filterData.map((subtype)=>{
        let currentType = filterState.types[type];
        let isTypeActive = currentType[subtype as keyof typeof currentType];
        if(isTypeActive) countActive++;
        if (!subtype) return null;
        const status = statuses?.find((s: StatusesInterface) => s.id === subtype);

        const nameKey = `name${i18n.language.toUpperCase()}` as keyof typeof status;
        const name = status ? status[nameKey] as string : "";

        return <FilterButton 
        handleFilterChange={()=>handleFilterChange(subtype)} 
        imgSrc={`${process.env.PUBLIC_URL}/images/tags/${subtype}.webp`}
        isTypeActive={isTypeActive}
        type={subtype}
        name={`${name}`}
        key={subtype} />
    })}
       <header>
        {t("FiltersList.header.statusType")}
        {countActive >= 1 && <button className="filters-clear-section" onClick={()=>handleClearSection(type)}><EraserSVG/></button>}
        </header>
       <button 
        className={"filters-filter"} 
        onClick={()=>{setIsAllFiltersShown(!isAllFiltersShown)}}>
            <div className="filters-filter-tooltip">{isAllFiltersShown ? t("FiltersSection2.hide") : t("FiltersSection2.show")} </div>
            {isAllFiltersShown ? "<<<" : "..."}
        </button>
    </section>
}