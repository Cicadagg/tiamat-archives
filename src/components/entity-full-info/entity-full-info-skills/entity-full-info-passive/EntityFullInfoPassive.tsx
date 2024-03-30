import React from 'react';
import { IdentityInterface } from '../../../../store/reducers/ids-reducer';
import { IPassive} from '../EntityFullInfoSkills';
import "./EntityFullInfoPassive.css"
import { SkillCoinDescription } from '../../skill-coin-description/SkillCoinDescription';
import { useTranslation } from 'react-i18next';
interface IEntityFullInfoProps {
    identity:IdentityInterface;
    passive:IPassive;
}
export const EntityFullInfoPassive:React.FC<IEntityFullInfoProps> = ({identity,passive}) => {
    const {imgUrl} = identity;
    const {t} = useTranslation();
    return (
        <article className={`${'entityFullInfo-passive'}`} >
                    <span className={`${'entityFullInfo-passive-index'}`} >{passive.type} </span>
                    <p className={`${'passive-name'} ${passive.sin}-sin-color`} >{passive.name}</p>
                        <div className={`${'passive-atk'} tooltip-container`} >
                            <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin}.png`} alt={`${imgUrl}`}/>
                            <span>x{passive.count}{passive.condition === "res" ? t("EntityFullInfoPassive.res") : t("EntityFullInfoPassive.owned")}</span>
                        </div>
                        <SkillCoinDescription description={passive.description} />
            </article>
    );
};