import React, { useState } from 'react';
import { IdentityInterface } from '../../../../store/reducers/ids-reducer';
import { IPassive } from '../EntityFullInfoSkills';
import "./EntityFullInfoPassive.css";
import { SkillCoinDescription } from '../../skill-coin-description/SkillCoinDescription';
import { useTranslation } from 'react-i18next';

interface IEntityFullInfoProps {
    identity: IdentityInterface;
    passive: IPassive;
}

export const EntityFullInfoPassive: React.FC<IEntityFullInfoProps> = ({ identity, passive }) => {
    const { imgUrl } = identity;
    const { t, i18n } = useTranslation();
    const descriptionPassive1Key = `descriptionPassive1${i18n.language.toUpperCase()}` as keyof typeof identity;
    const descriptionPassive1 = identity[descriptionPassive1Key] as string;
    const testDescription1 = descriptionPassive1.includes("|") && descriptionPassive1.split("|")[passive.index] || "";
    const testDescription2 = descriptionPassive1.includes("|") && descriptionPassive1.split("|")[passive.index + 1] || "";
    
    // Состояние для отображения подсказки
    const [tooltipVisible, setTooltipVisible] = useState(false);
    
    // Обработчики событий для мыши
    const handleMouseEnter = () => {
        if (passive.name.length > 30) {
            setTooltipVisible(true);
        }
    };

    const handleMouseLeave = () => {
        setTooltipVisible(false);
    };

    const [nameBP1, nameBP2] = passive.name.split(";");

    // Определяем сокращенное имя
    const displayedName = passive.name.length > 30 ? `${passive.name.substring(0, 30)}...` : passive.name;

    return (
        (passive.type !== t("ItemIdentityInfo.battlePassive"))
            ?
            <article className={`${'entityFullInfo-passive'}`} >
                <span className={`${'entityFullInfo-passive-index'}`}>{passive.type} </span>
                <p 
                    className={`${'passive-name'} ${passive.sin}-sin-color`} 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                >
                    {displayedName}
                </p>
                {tooltipVisible && (
                    <div className="tooltip">
                        {passive.name}
                    </div>
                )}
                {
                    (passive.sin.length === 2)
                        ?
                        <div className={`${'passive-atk'} tooltip-container`} >
                            <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin[0]}.webp`} alt={`${imgUrl}`} />
                            <span>x{passive.count[0]}</span>
                            &nbsp;
                            <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin[1]}.webp`} alt={`${imgUrl}`} />
                            <span>x{passive.count[1]}{passive.condition === "res" ? t("EntityFullInfoPassive.res") : t("EntityFullInfoPassive.owned")}</span>
                        </div>
                        :
                        <div className={`${'passive-atk'} tooltip-container`} >
                            <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin}.webp`} alt={`${imgUrl}`} />
                            <span>x{passive.count}{passive.condition === "res" ? t("EntityFullInfoPassive.res") : t("EntityFullInfoPassive.owned")}</span>
                        </div>
                }
                <SkillCoinDescription description={passive.description} />
            </article>
            :
            (descriptionPassive1.includes("|"))
                ?
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px", marginBottom: "15px" }}>
                    {passive.name.split(";").map((nameBP, index) => {
                        const testDescription = descriptionPassive1.split("|")[index];
                        // Определяем сокращенное имя для каждого элемента
                        const displayedBPName = nameBP.length > 30 ? `${nameBP.substring(0, 30)}...` : nameBP;

                        return (
                            <article className={`${'entityFullInfo-passive'}`} key={index}>
                                <span className={`${'entityFullInfo-passive-index'}`}>{passive.type} </span>
                                <p 
                                    className={`${'passive-name'}`} 
                                    onMouseEnter={() => nameBP.length > 30 && setTooltipVisible(true)} 
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {displayedBPName}
                                </p>
                                {tooltipVisible && (
                                    <div className="tooltip">
                                        {nameBP}
                                    </div>
                                )}
                                {(index === passive.name.split(";").length - 1) && (
                                    <div className={`${'passive-atk'} tooltip-container`}>
                                        {Array.isArray(passive.sin) ? passive.sin.map((sin, sinIndex) => (
                                            <React.Fragment key={sinIndex}>
                                                <img src={`${process.env.PUBLIC_URL}/images/sins/${sin}.webp`} alt={`${imgUrl}`} />
                                                <span>x{passive.count[sinIndex]}</span>
                                            </React.Fragment>
                                        )) : (
                                            <React.Fragment>
                                                <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin}.webp`} alt={`${imgUrl}`} />
                                                <span>x{passive.count}</span>
                                            </React.Fragment>
                                        )}
                                        <span>{passive.condition === "res" ? t("EntityFullInfoPassive.res") : t("EntityFullInfoPassive.owned")}</span>
                                    </div>
                                )}
                                <SkillCoinDescription description={testDescription} />
                            </article>
                        )
                    })}
                </div>
                :
                <article className={`${'entityFullInfo-passive'}`} >
                    <span className={`${'entityFullInfo-passive-index'}`}>{passive.type} </span>
                    <p 
                        className={`${'passive-name'} ${passive.sin}-sin-color`} 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave}
                    >
                        {displayedName}
                    </p>
                    {tooltipVisible && (
                        <div className="tooltip">
                            {passive.name}
                        </div>
                    )}
                    {
                        (passive.sin.length === 2)
                            ?
                            <div className={`${'passive-atk'} tooltip-container`} >
                                <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin[0]}.webp`} alt={`${imgUrl}`} />
                                <span>x{passive.count[0]}</span>
                                &nbsp;
                                <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin[1]}.webp`} alt={`${imgUrl}`} />
                                <span>x{passive.count[1]}{passive.condition === "res" ? t("EntityFullInfoPassive.res") : t("EntityFullInfoPassive.owned")}</span>
                            </div>
                            :
                            <div className={`${'passive-atk'} tooltip-container`} >
                                <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin}.webp`} alt={`${imgUrl}`} />
                                <span>x{passive.count}{passive.condition === "res" ? t("EntityFullInfoPassive.res") : t("EntityFullInfoPassive.owned")}</span>
                            </div>
                    }
                    <SkillCoinDescription description={passive.description} />
                </article>
    );
};
