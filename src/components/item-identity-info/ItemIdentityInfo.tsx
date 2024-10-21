import React from "react";
import { useTranslation } from "react-i18next";
import { dmgType, guardType, sinType } from "../../constants/types";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import "./ItemIdentityInfo.css";
interface ItemIdentityInfoInterface{
    entity:IdentityInterface;
}
type Tskill = {
    imageUrl:string,
    type:dmgType|guardType,
    count:number,
    sin:sinType
}
export const ItemIdentityInfo:React.FC<ItemIdentityInfoInterface> = ({entity}) => {
    const {guardType,idTier,sinGuard,countPassive1,countPassive2,sinPassive1,sinPassive2,skillsDmgType,skillsSin} = entity;
    const {t} = useTranslation();
    const setupSkills = (): Tskill[] => {
        const counts = [3, 2, 1];
        const result: Tskill[] = [];
        const minLength = Math.min(skillsDmgType.length, skillsSin.length);
        for (let i = 0; i < minLength; i++) {
            const curr = {
                imageUrl: `dmg-type/${skillsDmgType[i]}`,
                type: skillsDmgType[i],
                count: counts[i] || 0,
                sin: skillsSin[i]
            };
            result.push(curr);
        }
        return result;
    };
    const skills:Tskill[] = [
        ...setupSkills(),
        ...guardType.map((type,i)=>({imageUrl:`guard-type/${type}` , type ,count:1 , sin:sinGuard[i]})),
    ];
   
    const passives = [
        {imageUrl:[`sins/${sinPassive1[0]}`,`sins/${sinPassive1[1]}`] , count:[countPassive1[0],countPassive1[1]] , description: t("ItemIdentityInfo.battlePassive") },
        {imageUrl:`sins/${sinPassive2}` , count:countPassive2 , description: t("ItemIdentityInfo.supportPassive") },
    ]
    
    return (
        <div className={`item-identity-info-container `} >
            <div className={"item-identity-info-skills"}>
                {skills.map(({imageUrl,sin})=>{
                    return (
                        <div key={`skill${Math.random()}`} className="item-identity-info-sin">
                            <img  src={`${process.env.PUBLIC_URL}/images/${imageUrl}.png`} alt={imageUrl}/>
                            <div className={["item-identity-info-line", `${sin}-sin-color`].join(" ")}></div>
                        </div>
                    )
                })}
                
           </div>
           <div className={"item-identity-info-tiers"}>
                {
                    passives.map(({imageUrl,count,description},index)=>{
                            return(
                                    (description == t("ItemIdentityInfo.battlePassive") && count)
                                    ? <div key={`${index}`} className="item-identity-info-tier">
                                        <div className="item-identity-info-tier-description">
                                            <img src={`${process.env.PUBLIC_URL}/images/${imageUrl[0]}.png`} alt={imageUrl[0]}/>
                                            {count[0] > 0 && <span>{`x${count[0]}`}</span>}
                                        </div>
                                        {
                                            count[1] && <div className="item-identity-info-tier-description">
                                                <img src={`${process.env.PUBLIC_URL}/images/${imageUrl[1]}.png`} alt={imageUrl[1]}/>
                                                {count[1] > 0 && <span>{`x${count[1]}`}</span>}
                                            </div>
                                        }    
                                        <div className="item-identity-info-tier-rank-container">
                                            <span >{description}</span>
                                        </div>

                                    </div>
                                    : <div key={`${index}`} className="item-identity-info-tier">
                                        <div className="item-identity-info-tier-description">
                                            <img src={`${process.env.PUBLIC_URL}/images/${imageUrl}.png`} alt={imageUrl[0]}/>
                                            {count[0] > 0 && <span>{`x${count}`}</span>}
                                        </div>
                                        <div className="item-identity-info-tier-rank-container">
                                            <span >{description}</span>
                                        </div>

                                    </div>
                            )
                    })  
                }
            </div>
            <span className={["item-identity-info-tier-rankID", `item-identity-info-tier-rank--${idTier}`].join(" ")} >{idTier}</span>
            <div className={"item-identity-info-arrow"}/>
        </div>
    )
}