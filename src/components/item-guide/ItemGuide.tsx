import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./ItemGuide.css";
import { GuideInterface } from "../../store/reducers/guides-reducer";
import { addTag, GuideTagInterface, removeTag, TagsState } from "../../store/reducers/guides-tags-reducer";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { filterChangeTypeAction } from "../../store/reducers/filter-reducer";

const formatDateFromISO = (dateString: string | number): string => {
    console.log('Полученная дата:', dateString);
    
    let newDate: Date;

    if (typeof dateString === 'string') {
        newDate = new Date(dateString);
    } else if (typeof dateString === 'number') {
        // Если это количество дней с начала эпохи Excel (30 декабря 1899 года)
        const excelStartDate = new Date(1899, 11, 30);
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        newDate = new Date(excelStartDate.getTime() + dateString * millisecondsPerDay);
    } else {
        console.error('Invalid date format');
        throw new Error('Invalid date format');
    }

    // Проверяем, является ли дата допустимой
    if (isNaN(newDate.getTime())) {
        console.error('Invalid date format');
        throw new Error('Invalid date format');
    }

    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const day = String(newDate.getDate()).padStart(2, '0');
    const formattedDate = `${day}.${month}.${newDate.getFullYear()}`;
    console.log('Отформатированная дата:', formattedDate);
    return formattedDate;
};


export interface IItemEntity{
    entity: GuideInterface;
    tags: GuideTagInterface[],
    animationDelay?:number;
}
export const ItemGuide:React.FC<IItemEntity> = ({entity, tags}) =>{
    let {ids, date, nameRu, nameEn} = entity;
    const { i18n } = useTranslation();

    function handleFilterChange(key: string){
        filterChangeTypeAction(dispatch,key);
       
        if (tagsReducer.selectedTags.includes(key)){
            dispatch(removeTag(key))
        }
        else{
            dispatch(addTag(key));
        }
    }

    const tagsReducer = useTypedSelector(state => state.tagsReducer) as TagsState;
    const selectedTags = tagsReducer.selectedTags;

    const dispatch = useDispatch();

    return (
        <li className="guide-info-item" key={ids}>
            <Link to={`/${i18n.language}/guides/${ids}`} className="guide-info-link-wrapper">
                <div className="guide-info-content">
                    <time className="guide-info-date">
                    {(i18n.language == 'ru') ? 'Последнее изменение' : 'Last updated on'}: {formatDateFromISO(date)}
                    </time>
                    <h2 className="guide-info-title">{ (i18n.language === "ru") ? nameRu : nameEn }</h2>
                    <div className="guide-info-image-wrapper">
                        <img 
                            src={`${process.env.PUBLIC_URL}/images/guides/${ids}/${ids}.webp`} 
                            alt={ (i18n.language === "ru") ? nameRu : nameEn }
                            className="guide-info-image" 
                        />
                    </div>
                </div>
            </Link>
            <div className="guide-tags-container">
                <div className="guide-tags">
                    {tags?.slice(0, 3).map((tag: GuideTagInterface) => (
                        <button
                            key={tag.Id}
                            className={`tag-item ${selectedTags.includes(tag.Id) ? 'active' : ''}`}
                            onClick={() => handleFilterChange(tag.Id)}
                        >
                            {(i18n.language == 'ru') ? tag.nameRu : tag.nameEn}
                        </button>
                    ))}
                </div>
            </div>
        </li>
    )
}