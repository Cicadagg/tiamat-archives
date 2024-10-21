import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { rarityEGOType } from "../../../constants/types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { filterChangeTypeAction, filterClearSectionAction } from "../../../store/reducers/filter-reducer";
import { EraserSVG } from "../../svg/EraserSvg";
import { FilterButton } from "../filter-button/FilterButton";
import { FilterButtonGuides } from "../filter-button/FilterButtonGuides";
import { FilterButtonTags } from "../filter-button/FilterButtonTags";
import { addTag, clearTags, GuideTagInterface, removeTag, TagsState } from "../../../store/reducers/guides-tags-reducer";


type TFilter = {
    type:string ,
    data:GuideTagInterface[],
    visible:boolean,
    header:string
}
export const TagsFiltersSection:React.FC<{filter:TFilter}> = ({filter}) => {
    const filterState = useTypedSelector(state => state.filterReducer);
    const {t} = useTranslation();    
    const dispatch = useDispatch();
    let countActive = 0;
    function handleFilterChange(key: string){
        filterChangeTypeAction(dispatch,key);
        if (selectedTags.selectedTags.includes(key)){
            dispatch(removeTag(key))
        }
        else{
            dispatch(addTag(key));
        }
        console.log(selectedTags)
        console.log(key);
    }

    const selectedTags = useTypedSelector(state => state.tagsReducer) as TagsState;

    /*const handleTagClick = (tagId: string) => {
        if (selectedTags.includes(tagId)) {
            dispatch(removeTag(tagId));
        } else {
            dispatch(addTag(tagId));
        }
    };*/

    //const handleFilterChange = (key:string) => filterChangeTypeAction(dispatch,key);
    const handleClearSection = (section:string) => {
        filterClearSectionAction(dispatch,section);
        console.log(84848488484)
        dispatch(clearTags());
    }
    const {type, data, header} = filter;
    console.log(data)

    return (
        <section className="filters-section">
        
        {data.map((subtype: GuideTagInterface)=>{
            let currentType = filterState.types[type];
            let isTypeActive = currentType[subtype.Id as keyof typeof currentType];
            if(isTypeActive) countActive++;
            
            return <FilterButtonTags
            name={t(`${subtype.nameRu}`)}
            handleFilterChange={()=>handleFilterChange(subtype.Id)} 
            isTypeActive={isTypeActive}
            type={subtype.nameRu}
            key={subtype.Id} />
        })}
        <header>
            {header}
            {countActive >= 1 && <button className="filters-clear-section" onClick={()=>handleClearSection(filter.type)}><EraserSVG/></button>}
        </header>
        </section>
    )
}