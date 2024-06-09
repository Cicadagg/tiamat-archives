import React from 'react';
import { useTranslation } from 'react-i18next';
import { dmgType, guardType, sinType } from '../../../constants/types';
import { EGOInterface } from '../../../store/reducers/ego-reducer';
import { EntityFullInfoPassiveEGO } from './entity-full-info-passive/EntityFullInfoPassive';
import { EntityFullInfoSkillEGO } from './entity-full-info-skill/EntityFullInfoSkill';
import "./EntityFullInfoSkills.css"
interface IEntityFullInfoProps {
    ego:EGOInterface;
}
export interface ISkillEGO {
    index:number;
    dmgType:dmgType|guardType;
    sin:sinType;
    coins:number;
}
export const EntityFullInfoSkillsEGO:React.FC<IEntityFullInfoProps> = ({ego}) => {
    const {dmgType,egoSin,countCoin} =ego;
    const {i18n} = useTranslation();
    const descriptionCoinKey = `descriptionCoin${i18n.language.toUpperCase()}` as keyof typeof ego;
    const descriptionCoin = ego[descriptionCoinKey] as string;

    const skills:ISkillEGO[] = descriptionCoin.includes("|") ? [
        {
            index:0,
            dmgType:dmgType[0] as dmgType,
            sin:egoSin as sinType,
            coins:countCoin[0]
        },
        {
            index:1,
            dmgType:(dmgType[1] ? dmgType[1] : dmgType[0] ) as dmgType,
            sin:egoSin as sinType,
            coins:countCoin[1]

        }
    ] : [
        {
            index:0,
            dmgType:dmgType[0] as dmgType,
            sin:egoSin as sinType,
            coins:countCoin[0]
        }
    ];
    return (
        <section className={`${'entityFullInfo-skills'}`} >
            {
                skills.map(
                    (skill,index)=>{
                        return <EntityFullInfoSkillEGO skill={skill} key={index} ego={ego}/>
                    }
                )
            }
            <EntityFullInfoPassiveEGO  ego={ego}/>
        </section>
    );
};