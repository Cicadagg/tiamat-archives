import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { mobileLayoutFrom } from "../../constants/mobileLayoutFrom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { filterResetAllAction } from "../../store/reducers/filter-reducer";
import { setMobileModalTrigger } from "../../store/reducers/mobile-modal-reducer";
import { Search } from "../search/Search";
import { ClearFilterSVG } from "../svg/ClearFilterSVG";
import { EyeClosedSVG } from "../svg/EyeClosedSVG";
import { EyeOpenedSVG } from "../svg/EyeOpenedSVG";
import { FilterSVG } from "../svg/FilterSVG";
import { FiltersList } from "./filters-list/FiltersList";
import { FiltersSection2 } from "./filters-section2/FiltersSection2";
import "./Filters.css";

type TFilterVisibility = "hide" | "show";

export const Filters:React.FC = () => {
    const location =useLocation().pathname;
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const getFilterVisibilityValue = ()=>{
        const filterVisibility = localStorage.getItem("filterVisibility");
        if(filterVisibility && ["hide","shown"].includes(filterVisibility)){
            return filterVisibility as TFilterVisibility;
        }
        return "show";
    }
    const [filterVisibility, setFilterVisibility] = useState<TFilterVisibility>(getFilterVisibilityValue());
    const handleFilterChange = () => {
        const newFilterVisibility:TFilterVisibility = filterVisibility === "hide" ? "show" : "hide";
        setFilterVisibility(newFilterVisibility);
        localStorage.setItem("filterVisibility",newFilterVisibility);
    }
    const filterState = useTypedSelector(state => state.filterReducer);
    const calculateFiltersCount = () => {
        let count = 0;
        for(const key in filterState.types){
            for(const key2 in filterState.types[key]){
                count += Number(filterState.types[key][key2])
            }
        }
        return count;
    }
    return (
        <section className={"filters"}>
            <header className={`filters-main-header ${filterVisibility === "hide" ? "filters-main-header--collapse" : ""}`}>
                <span style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"5px"}}>
                    {t("Filters.header") + ` (${calculateFiltersCount()})`} 
                    {window.innerWidth > mobileLayoutFrom && 
                        <button className="filters-show-btn" onClick={handleFilterChange}>{filterVisibility === "show" ? <EyeOpenedSVG/> : <EyeClosedSVG/>}</button>
                    }
                </span>
                <div className={"filters-header-btns"}>
                <button onClick={()=>{setMobileModalTrigger(dispatch,
                    <div className="filters-modal-wrapper">
                    <FiltersList/>
                    <FiltersSection2/>
                    </div>)}} className="show-filters btn-filters"><FilterSVG/>{t("Filters.showFilters")} </button>
                <button onClick={()=>filterResetAllAction(dispatch)} className="clear-filters btn-filters"><ClearFilterSVG/>{t("Filters.clearFilters")} </button>
                {!location.includes("/teambuilder") && <Search/>}
                </div>
            </header>
                
            {
            filterVisibility === "show" && <article className={"filters-main"}>
                <FiltersList/>
                <FiltersSection2/>
            </article>
            }
        </section>
    )
}
