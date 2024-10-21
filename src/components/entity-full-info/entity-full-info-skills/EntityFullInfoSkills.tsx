import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dmgType, guardType, sinType } from '../../../constants/types';
import { IdentityInterface } from '../../../store/reducers/ids-reducer';
import { EntityFullInfoPassive } from './entity-full-info-passive/EntityFullInfoPassive';
import { EntityFullInfoSanity} from './entity-full-info-sanity/EntityFullInfoSanity';
import { EntityFullInfoSkill } from './entity-full-info-skill/EntityFullInfoSkill';
import "./EntityFullInfoSkills.css"
interface IEntityFullInfoProps {
    identity:IdentityInterface;
    maxLvlIdentity:number;
}
export interface ISkill {
    index:number;
    dmgType:dmgType|guardType;
    sin:sinType;
    type:"attack"|"guard";
    resourceCount:number;
}
export interface IPassive {
    index:number;
    sin:sinType;
    count:string;
    description:string;
    name:string;
    type:string;
    condition:string;
}
type TTabType = "skills" | "passives" | "sanity";
export const EntityFullInfoSkills:React.FC<IEntityFullInfoProps> = ({identity,maxLvlIdentity}) => {
    const {t,i18n} = useTranslation();
    const {skillsDmgType,skillsSin} = identity;
    const [activeTab, setActiveTab] = useState<TTabType>("skills");
    const handleChangeTab = (tabType:TTabType) => setActiveTab(tabType);
    const tabs:TTabType[] = ["skills","passives",'sanity'];
    const resourceCounts = [3,2,1]
    const skills:ISkill[] = Array(Math.min(skillsDmgType.length,skillsSin.length)).fill(1).map((n,index)=>{
        return {
            index,
            dmgType:skillsDmgType[index],
            sin:skillsSin[index],
            resourceCount:resourceCounts[index] || 0,
            type:"attack"
        }
    })
    if (identity.sinGuard && identity.guardType) {
        identity.sinGuard.forEach((sin, index) => {
            skills.push({
                index:skills.length,
                sin,
                dmgType:identity.guardType[index],
                resourceCount:0,
                type:"guard"
            });
        });
    }
    const passives:IPassive[] = [0,1].map((n,index)=>{
        let k1 = `sinPassive${n+1}` as keyof typeof identity;
        let k2 = `countPassive${n+1}` as keyof typeof identity;
        let k3 = `descriptionPassive${n+1}${i18n.language.toUpperCase()}` as keyof typeof identity;
        let k4 = `passive${n+1}Condition` as keyof typeof identity;
        let k5 = `namePassive${i18n.language.toUpperCase()}` as keyof typeof identity;
        let type = index === 0 ? t("EntityFullInfoSkills.battlePassive") : t("EntityFullInfoSkills.supportPassive") ;
        return {
            index:index,
            sin:identity[k1] as sinType,
            count:identity[k2] as string,
            description:identity[k3] as string,
            name:(identity[k5] as string[])[index],
            condition:identity[k4] as string,
            type:type,
        }
    })
    return (
        <section className={`${'entityFullInfo-skills'}`} >
            <ul className={`entityFullInfo-tabs`}>
                {
                    tabs.map((tabType)=>{
                        const isActive = activeTab === tabType;
                        return <li onClick={()=>handleChangeTab(tabType)} className={`entityFullInfo-tab ${isActive ? 'entityFullInfo-tab--active' : ""}`} key={tabType}>
                            {t(`EntityFullInfoSkills.tab.${tabType}`).toUpperCase()}
                            {isActive && <div className="entityFullInfo-tab-line" />}
                        </li>
                    })
                }
            </ul>
            {
                (activeTab === "skills") && skills.map(
                    (skill,index)=>{
                        return <EntityFullInfoSkill skill={skill} key={index} identity={identity} maxLvlIdentity={maxLvlIdentity}/>
                    }
                )
            }
            {
                (activeTab === "passives") && passives.map(
                    (passive,index)=>{
                        return <EntityFullInfoPassive passive={passive} key={index} identity={identity}/>
                    }
                )
            }
            {
                (activeTab === "sanity") && <EntityFullInfoSanity identity={identity}/>
            }
        </section>
    );
};
