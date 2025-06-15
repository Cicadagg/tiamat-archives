import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import { EGOInterface } from "../../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../../store/reducers/ids-reducer";
import { ItemEntity } from "../../item-entity/ItemEntity";
import "./EntitySection.css";

interface EntitySectionBarProps {
    section: {
        date: number;
        data: Array<IdentityInterface | EGOInterface>;
    }
}

export const EntitySection: React.FC = () => {
    const ids = useQueryClient().getQueryData("identities") as IdentityInterface[] | null;
    const ego = useQueryClient().getQueryData("ego") as EGOInterface[] | null;
    const { t } = useTranslation();

    function dateToExcel(jsDate: Date) {
        const excelStartDate = new Date(1899, 11, 30);
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const daysDifference = (jsDate.getTime() - excelStartDate.getTime()) / millisecondsPerDay;
        return daysDifference;
    }

    function excelToDate(excelDate: number) {
        const excelStartDate = new Date(1899, 11, 30);
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const date = new Date(excelStartDate.getTime() + excelDate * millisecondsPerDay);
        return date;
    }

    const formateDate = (date: number) => {
        const newDate = excelToDate(date);
        const month = `${newDate.getMonth() + 1}`;
        const day = `${newDate.getDate()}`;
        return `${day.length === 1 ? `0${day}` : day}.${month.length === 1 ? `0${month}` : month}.${newDate.getFullYear()}`
    }

    const findNLatestDates = (ids: IdentityInterface[], egos: EGOInterface[], N: number) => {
        const allData: Array<IdentityInterface | EGOInterface> = [...ids, ...egos];

        allData.sort((a, b) => {
            return b.releaseDate - a.releaseDate;
        });

        const result: Array<{ date: number, data: Array<IdentityInterface | EGOInterface> }> = [];

        for (let i = 0; i < allData.length; i++) {
            const currentData = allData[i];
            const date = currentData.releaseDate;
            if (!result.length) {
                result.push({ date, data: [currentData] });
                continue;
            }

            let isPushed = false;
            for (let r = 0; r < result.length; r++) {
                if (result[r].date === date) {
                    result[r].data.push(currentData);
                    isPushed = true;
                    break;
                }
            }
            if (!isPushed && result.length < N) {
                result.push({ date, data: [currentData] });
                continue;
            }
            if (!isPushed && result.length === N) break;
        }
        return result;
    }

    // Функция для сортировки данных
    const sortEntities = (data: Array<IdentityInterface | EGOInterface>) => {
        const egoRarityOrder: { [key: string]: number } = {
            ALEPH: 1,
            WAW: 2,
            HE: 3,
            TETH: 4,
            ZAYIN: 5,
        };

        data.sort((a, b) => {
            if (a && a.hasOwnProperty('rarity') && b && b.hasOwnProperty('rarity')) {
                const itemA = a as IdentityInterface;
                const itemB = b as IdentityInterface;
                const countA = itemA.rarity.split('O').length - 1;
                const countB = itemB.rarity.split('O').length - 1;
                return countB - countA;
            } else if (a && a.hasOwnProperty('rarity') && b && !b.hasOwnProperty('rarity')) {
                return -1;
            } else if (a && !a.hasOwnProperty('rarity') && b && b.hasOwnProperty('rarity')) {
                return 1;
            }
            if (a && a.hasOwnProperty('rarity')) {
                const itemA = a as EGOInterface;
                const itemB = b as EGOInterface;

                const orderA = egoRarityOrder[itemA.rarity] || Infinity;
                const orderB = egoRarityOrder[itemB.rarity] || Infinity;

                return orderA - orderB;
            }
            return 0;
        });
    };

    const EntitySectionBar: React.FC<EntitySectionBarProps> = ({ section }) => {
        const containerRef = useRef(null);
        const { isVisible } = useIntersectionObserver(containerRef, 0.1);

        // Сортируем данные перед рендерингом
        sortEntities(section.data);

        return (
            <article ref={containerRef} className={`entity-section-bar ${isVisible && "entity-section-bar--animated"}`}>
                <div className="release-date">
                    <span className="date"> {formateDate(section.date)} </span>
                    <hr></hr>
                </div>
                <div className="entities-list">
                    {
                        section.data.map((entity) => {
                            return <ItemEntity key={entity.imgUrl} entity={entity} />;
                        })
                    }
                </div>
            </article>
        );
    }

    return (
        <section className="entity-section">
            <h2 className="new-entity">{t('EntitySection.new')}</h2>
            {ids && ego && findNLatestDates(ids, ego, 10).map((section, index) => {
                return <EntitySectionBar key={index} section={section} />
            })
            }
        </section>
    );
}
