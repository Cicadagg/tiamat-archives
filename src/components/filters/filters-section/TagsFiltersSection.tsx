import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { filterChangeTypeAction, filterResetAllAction } from "../../../store/reducers/filter-reducer";
import { addTag, clearTags, GuideTagInterface, removeTag, TagsState } from "../../../store/reducers/guides-tags-reducer";
import { useEffect, useRef, useState } from "react";
import { XMarkSVG } from "../../svg/XMark";
import { SearchSVG } from "../../svg/SearchSVG";
import { searchChangeValueAction } from "../../../store/reducers/search-reducer";
import "./SearchAndFilter.css"
import { useQueryClient } from 'react-query';
import { setMobileModalTrigger } from "../../../store/reducers/mobile-modal-reducer";
import { FilterSVG } from "../../svg/FilterSVG";
import { ClearFilterSVG } from "../../svg/ClearFilterSVG";
import { TagsFiltersMd } from "./TagsFiltersMd";


type TFilter = {
    type:string ,
    data:GuideTagInterface[],
    visible:boolean,
    header:string
}


export const TagsFiltersSection:React.FC<{filter:TFilter}> = ({filter}) => {
    const {t} = useTranslation();    
    const dispatch = useDispatch();

    function handleFilterChange(key: string){
        filterChangeTypeAction(dispatch,key);
       
        if (tagsReducer.selectedTags.includes(key)){
            dispatch(removeTag(key))
        }
        else{
            dispatch(addTag(key));
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);
    const tagsContainerRef = useRef<HTMLDivElement>(null);
    const { i18n } = useTranslation();
    const [timeoutId, setTimeoutId] = useState<null | NodeJS.Timeout>(null);
    const [tagLimit, setTagLimit] = useState<number>(7);
    const [showAllTopTags, ] = useState(false);
    const [showDropdownTags, setShowDropdownTags] = useState(false);
    const [isButtonActive, setIsButtonActive] = useState(false);

    const calculateShowTagLimit = () => {
        return 7;
    };

    useEffect(() => {
        const handleResize = () => {
            setTagLimit(calculateShowTagLimit());
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            searchChangeValueAction(dispatch, val)
            setTimeoutId(null);
        }, 500);

        setTimeoutId(newTimeoutId);
    };

    const handleClearSearch = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            searchChangeValueAction(dispatch, '')
        }
    };

    const toggleDropdownTags = () => {
        setShowDropdownTags(prev => !prev);
        setIsButtonActive(prev => !prev);
    };

    const tagsReducer = useTypedSelector(state => state.tagsReducer) as TagsState;
    const tags = useQueryClient().getQueryData('tags') as GuideTagInterface[];

    function setMobile(){
        setMobileModalTrigger(
            dispatch,
            <TagsFiltersMd />
        )
    }

    function clearTagsHandler(){
        filterResetAllAction(dispatch)
        dispatch(clearTags());
    }

    return (
        <>
        <span className="filters-count" style={{alignItems:"center",marginBottom: "10px",gap:"5px", fontSize: "32px", fontWeight: 600, color: "white"}}>
                    {t("Filters.header") + ` (${tagsReducer.selectedTags.length})`} 
        </span>

            <div className={"filters-header-btns"} style={{justifyContent: "left"}}>
                <div className="search">
                    <input
                        ref={inputRef}
                        placeholder={(i18n.language === "ru" ? "Фильтрация по названию..." : "Filter by name...")}
                        onChange={handleInputChange}
                    />
                    {inputRef.current?.value && (
                        <button className="btn-clear" type="button" onClick={handleClearSearch}>
                            <XMarkSVG />
                        </button>
                    )}
                    <button aria-label="apply filter by name" className="btn-search" type="submit">
                        <SearchSVG />
                    </button>
                    <div className={`search-loader ${!timeoutId ? "search-loader--hidden" : ""}`}>
                        <div className="search-gray-line"></div>
                        <div className="search-white-line"></div>
                    </div>
                </div>

                <button onClick={clearTagsHandler} style={{gap: "8px"}} className="clear-filters btn-filters"><ClearFilterSVG/>{t("Filters.clearFilters")} </button>

                <button onClick={setMobile} className="show-filters btn-filters" style={{marginBottom: "20px"}}>
                            <FilterSVG/>
                        {t("Filters.showFilters")}
                </button>

                <div className="tag-list" ref={tagsContainerRef}>
                {tags && tags.length > 0 && (
                    <>
                        {tags.slice(0, showAllTopTags ? tags.length : tagLimit).map((tag: GuideTagInterface) => (
                            <button
                                key={tag.Id}
                                className={`tag-item ${tagsReducer.selectedTags.includes(tag.Id) ? 'active' : ''}`} // Добавлено условие для активного тега
                                onClick={() => handleFilterChange(tag.Id)}
                            >
                                {(i18n.language == 'ru') ? tag.nameRu : tag.nameEn}
                            </button>
                        ))}
                        <button 
                        className={`show-more-btn ${isButtonActive ? 'active' : ''}`} 
                        onClick={toggleDropdownTags}
                        >
                        {tagsReducer.selectedTags.length === 0 && (
                            <span>{(i18n.language == 'ru') ? 'Все' : 'All'}</span>
                        )}
                        {tagsReducer.selectedTags.length > 0 && (
                            <span className="tag-count-circle">{tagsReducer.selectedTags.length}</span>
                        )} {showDropdownTags ? '▲' : '▼'}
                        </button>
                        {showDropdownTags && (
                            <div className="dropdown-tags">
                                <div className="selected-tags-count">
                                    {(i18n.language == 'ru') ? 'Выбрать теги' : 'Select tags'}
                                    <span className="tag-count-circle">{(tagsReducer.selectedTags.length == 0) ? 0 : tagsReducer.selectedTags.length}</span>
                                </div>
                                <div className="tags-container">
                                    {tags.map((tag: GuideTagInterface) => (
                                        <button
                                            key={tag.Id}
                                            className={`dropdown-tag-item ${tagsReducer.selectedTags.includes(tag.Id) ? 'active' : ''}`} // Добавлено условие для активного тега
                                            onClick={() => handleFilterChange(tag.Id)}
                                        >
                                            {(i18n.language == 'ru') ? tag.nameRu : tag.nameEn}
                                        </button>
                                    ))}
                                </div>
                                <hr style={{ border: '1px solid #AFAEB4', maxWidth: '24rem', width: '100%', margin:'0.5rem', opacity: '0.2' } as React.CSSProperties} />
                                <button className="btn-clear-all-tags" type="button" onClick={clearTagsHandler}>
                                    {(i18n.language == 'ru') ? 'Очистить все теги' : 'Clear all tags'}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            </div>
        </>
    )
}