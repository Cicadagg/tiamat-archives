import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { rarityEGOType } from "../../../constants/types";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { filterChangeTypeAction, filterClearSectionAction } from "../../../store/reducers/filter-reducer";
import { EraserSVG } from "../../svg/EraserSvg";
import { FilterButton } from "../filter-button/FilterButton";

type TFilter = {
    type:string ,
    imgsFolder:string|null,
    imgExtension:string,
    data:string[]|Array<{rarity:rarityEGOType;glyph:string}>,
    visible:boolean,
    header:string
}
export const FiltersSection:React.FC<{filter:TFilter}> = ({filter}) => {
    const filterState = useTypedSelector(state => state.filterReducer);
    const {t} = useTranslation();    
    const dispatch = useDispatch();
    let countActive = 0;
    const handleFilterChange = (key:string) =>filterChangeTypeAction(dispatch,key);
    const handleClearSection = (section:string) =>  filterClearSectionAction(dispatch,section);
    const {type, data,header} =filter;
    return (
        <section className="filters-section">
            {data.map((subtype)=>{
                let currentType = filterState.types[type];
                if(typeof subtype !== "object"){
                    let isTypeActive = currentType[subtype as keyof typeof currentType];
                    if(isTypeActive) countActive++;
                
                    return <FilterButton
                    name={t(`FiltersSection.${subtype}`)}
                    handleFilterChange={()=>handleFilterChange(subtype)} 
                    imgSrc={`${process.env.PUBLIC_URL}/images/${filter.imgsFolder}/${subtype}${filter.imgExtension}`}
                    isTypeActive={isTypeActive}
                    type={subtype}
                    key={subtype} />
                }else{
                    let isTypeActive = currentType[subtype.rarity as keyof typeof currentType];
                    if(isTypeActive) countActive++;
                    return <FilterButton 
                    handleFilterChange={()=>handleFilterChange(subtype.rarity)} 
                    imgSrc={null}
                    content={subtype.glyph}
                    isTypeActive={isTypeActive}
                    type={subtype.rarity}
                    key={subtype.rarity} />
                }
            })}
            <header>
                {header}
                {countActive >= 1 && <button className="filters-clear-section" onClick={()=>handleClearSection(filter.type)}><EraserSVG/></button>}
            </header>
        </section>
    )
}