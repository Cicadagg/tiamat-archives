import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./GuidePageFull.css";
import "../../entity-full-info/entity-full-info-ego/EntityFullInfoEGO.css"
import { SkillCoinDescription } from "../text-formatter/SkillCoinDescription";
import "../../main-info/NavigationSection/NavigationSection.css"
import { GuideInterface } from "../../../store/reducers/guides-reducer";
import { GuideTagInterface } from "../../../store/reducers/guides-tags-reducer";
import { useQueryClient } from 'react-query';
import { SEOHelmet } from '../../../pages/SEOHelmet';

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


export const GuidePageFull: React.FC = () => {
    function processDescription(description: string){
        return <SkillCoinDescription description={description} />
    }
    
    const { guideId } = useParams();
    const guides = useQueryClient().getQueryData('guides') as GuideInterface[];
    const tags = useQueryClient().getQueryData('tags') as GuideTagInterface[];
    const { i18n } = useTranslation();
    const guide = guides?.find((g: GuideInterface) => g.ids === guideId);

    if(!guide) return null;

    const nameKey = (i18n.language === "ru") ? "nameRu" : "nameEn";
    const name = guide[nameKey] as string;


    if (guide) {
        // Извлечение ID тегов из гайда
        const guideTagsIds: string[] = guide.tagsId.split(',').map((id: string) => id.trim());

        // Извлечение названий тегов
        const guideTags: GuideTagInterface[] | undefined = tags?.filter((tag: GuideTagInterface) => guideTagsIds.includes(tag.Id));
        // Получение описания на нужном языке
        const description = i18n.language === "ru" ? guide.descriptionRu : guide.descriptionEn;

        // Обработка описания для применения форматирования
        const processedDescription = processDescription(description);

        return (
            <>
                <SEOHelmet titleText={`${name} | Great Limbus Library`} descriptionText=""/>
                <div className="guide-page">
                    <h1 className="guide-page-title">{i18n.language === "ru" ? guide.nameRu : guide.nameEn}</h1>
                    <div className="guide-header">
                        <time className="guide-page-date">
                            {(i18n.language === 'ru') ? 'Последнее изменение' : 'Last updated on'}: {guide ? formatDateFromISO(guide.date) : ''}
                        </time>
                        <div className="guide-tags-container">
                            <span className="tags-title">{(i18n.language === 'ru') ? 'Список всех тегов' : 'List of all tags'}: </span>
                            {guideTags?.map((tag: GuideTagInterface) => (
                                <span
                                    key={tag.Id}
                                    className="dropdown-tag-item"
                                >
                                    {(i18n.language === 'ru') ? tag.nameRu : tag.nameEn}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="guide-page-content">
                        {processedDescription }
                    </div>
                </div>
            </>
        );
    }  else {
        return <div>Guide not found</div>;
    }
    
};
