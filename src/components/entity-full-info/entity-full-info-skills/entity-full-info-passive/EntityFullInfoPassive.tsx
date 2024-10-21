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
    const {t, i18n} = useTranslation();
    const descriptionPassive1Key = `descriptionPassive1${i18n.language.toUpperCase()}` as keyof typeof identity;
    const descriptionPassive1 = identity[descriptionPassive1Key] as string;
    const testDescription1 = descriptionPassive1.includes("|") && descriptionPassive1.split("|")[passive.index] || "";
    const testDescription2 = descriptionPassive1.includes("|") && descriptionPassive1.split("|")[passive.index+1] || "";
    const [nameBP1, nameBP2] = passive.name.split(";");

    return (
        (passive.type !== t("ItemIdentityInfo.battlePassive"))
        ?
        <article className={`${'entityFullInfo-passive'}`} >
            <span className={`${'entityFullInfo-passive-index'}`} >{passive.type} </span>
            <p className={`${'passive-name'} ${passive.sin}-sin-color`} >{passive.name}</p>
            {
                (passive.sin.length === 2)
                ? 
                <div className={`${'passive-atk'} tooltip-container`} >
                    <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin[0]}.png`} alt={`${imgUrl}`}/>
                    <span>x{passive.count[0]}</span>
                    <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin[1]}.png`} alt={`${imgUrl}`}/>
                    <span>x{passive.count[1]}{passive.condition === "res" ? t("EntityFullInfoPassive.res") : t("EntityFullInfoPassive.owned")}</span>
                </div>
                :
                <div className={`${'passive-atk'} tooltip-container`} >
                    <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin}.png`} alt={`${imgUrl}`}/>
                    <span>x{passive.count}{passive.condition === "res" ? t("EntityFullInfoPassive.res") : t("EntityFullInfoPassive.owned")}</span>
                </div>
            }
            <SkillCoinDescription description={passive.description} />
        </article>
        :
        (descriptionPassive1.includes("|"))
        ?
        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"20px",marginBottom:"15px"}}>
            <article className={`${'entityFullInfo-passive'}`} >
                <span className={`${'entityFullInfo-passive-index'}`} >{passive.type} </span>
                <p className={`${'passive-name'} ${passive.sin[0]}-sin-color`} >{nameBP1}</p>
                <SkillCoinDescription description={testDescription1} />
            </article>
            <article className={`${'entityFullInfo-passive'}`} >
                <span className={`${'entityFullInfo-passive-index'}`} >{passive.type} </span>
                <p className={`${'passive-name'} ${passive.sin[1]}-sin-color`} >{nameBP2}</p>
                {
                    (passive.sin.length === 2)
                    ? 
                    <div className={`${'passive-atk'} tooltip-container`} >
                        <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin[0]}.png`} alt={`${imgUrl}`}/>
                        <span>x{passive.count[0]}</span>
                        &nbsp;
                        <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin[1]}.png`} alt={`${imgUrl}`}/>
                        <span>x{passive.count[1]}{passive.condition === "res" ? t("EntityFullInfoPassive.res") : t("EntityFullInfoPassive.owned")}</span>
                    </div>
                    :
                    <div className={`${'passive-atk'} tooltip-container`} >
                        <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin}.png`} alt={`${imgUrl}`}/>
                        <span>x{passive.count}{passive.condition === "res" ? t("EntityFullInfoPassive.res") : t("EntityFullInfoPassive.owned")}</span>
                    </div>
                }
                <SkillCoinDescription description={testDescription2} />
            </article>
        </div>
        :
        <article className={`${'entityFullInfo-passive'}`} >
            <span className={`${'entityFullInfo-passive-index'}`} >{passive.type} </span>
            <p className={`${'passive-name'} ${passive.sin}-sin-color`} >{passive.name}</p>
            {
                (passive.sin.length === 2)
                ? 
                <div className={`${'passive-atk'} tooltip-container`} >
                    <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin[0]}.png`} alt={`${imgUrl}`}/>
                    <span>x{passive.count[0]}</span>
                    <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin[1]}.png`} alt={`${imgUrl}`}/>
                    <span>x{passive.count[1]}{passive.condition === "res" ? t("EntityFullInfoPassive.res") : t("EntityFullInfoPassive.owned")}</span>
                </div>
                :
                <div className={`${'passive-atk'} tooltip-container`} >
                    <img src={`${process.env.PUBLIC_URL}/images/sins/${passive.sin}.png`} alt={`${imgUrl}`}/>
                    <span>x{passive.count}{passive.condition === "res" ? t("EntityFullInfoPassive.res") : t("EntityFullInfoPassive.owned")}</span>
                </div>
            }
            <SkillCoinDescription description={passive.description} />
        </article>
    );
};