import React from 'react';
import "./EntityFullInfoPassive.css"
import { EGOInterface } from '../../../../store/reducers/ego-reducer';
import { SkillCoinDescription } from '../../skill-coin-description/SkillCoinDescription';
import { useTranslation } from 'react-i18next';
interface IEntityFullInfoProps {
    ego:EGOInterface;
}
export const EntityFullInfoPassiveEGO:React.FC<IEntityFullInfoProps> = ({ego}) => {
    const {i18n} = useTranslation();

    const namePassiveKey = `namePassive${i18n.language.toUpperCase()}` as keyof typeof ego;
    const namePassive = ego[namePassiveKey] as string;

    const descriptionPassiveKey = `descriptionPassive${i18n.language.toUpperCase()}` as keyof typeof ego;
    const descriptionPassive = ego[descriptionPassiveKey] as string;
    
    return (
        <article className={`${'entityFullInfo-passive'}`} >
                    <p className={`${'passive-name'} `} >{namePassive}</p>
                    <SkillCoinDescription description={descriptionPassive} />
        </article>
    );
};