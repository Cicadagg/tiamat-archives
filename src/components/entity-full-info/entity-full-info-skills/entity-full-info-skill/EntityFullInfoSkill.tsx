import React, { useState } from 'react';
import { IdentityInterface } from '../../../../store/reducers/ids-reducer';
import { ISkill } from '../EntityFullInfoSkills';
import "./EntityFullInfoSkill.css"
import { SkillCoinDescription } from '../../skill-coin-description/SkillCoinDescription';
import { getAtackWeightBonusFromDescription } from '../../../../tools/getAtackWeightBonusFromDescription';
import { getUnbreakableCoinBonusFromDescription } from '../../../../tools/getUnbreakableCoinBonusFromDescription';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setMobileModalTrigger } from '../../../../store/reducers/mobile-modal-reducer';
import { TooltipMobile } from '../../../tooltip-mobile/TooltipMobile';
import { mobileLayoutFrom } from '../../../../constants/mobileLayoutFrom';
interface IEntityFullInfoProps {
    identity:IdentityInterface;
    skill:ISkill;
    maxLvlIdentity:number;
}
export const EntityFullInfoSkill:React.FC<IEntityFullInfoProps> = ({identity,skill,maxLvlIdentity}) => {
    const {imgUrl,countCoin,basicCoin,weightCoin,growthPerCoin,damage,maxCoinValue,fullMaxCoinValue,maxPossibleDmg,minPossibleDmg,skillsOrder} = identity;
    const {t,i18n} = useTranslation();
    
    const nameSkillKey = `nameSkill${i18n.language.toUpperCase()}` as keyof typeof identity;
    const nameSkill = identity[nameSkillKey] as string[];
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const handleMouseEnter = () => {
        if (nameSkill[skill.index].length > 20) {
            setTooltipVisible(true);
        }
    };

    const handleMouseLeave = () => {
        setTooltipVisible(false);
    };

    const descriptionCoinKey = `descriptionCoin${i18n.language.toUpperCase()}` as keyof typeof identity;
    const descriptionCoin = identity[descriptionCoinKey] as string;

    const descriptionPassive1Key = `descriptionPassive1${i18n.language.toUpperCase()}` as keyof typeof identity;
    const descriptionPassive1 = identity[descriptionPassive1Key] as string;

    const testDescription = descriptionCoin.includes("|") && descriptionCoin.split("|")[skill.index] || "";
    const coins = Array(countCoin[skill.index]).fill(0);
    const attackWeightBuff = getAtackWeightBonusFromDescription([testDescription,descriptionPassive1]);
    const unbreakableCoinBuff = getUnbreakableCoinBonusFromDescription(testDescription,countCoin[skill.index]);
    const dispatch = useDispatch();

    const damageOrGuardType = ((skill.index === 3 && skill.type === `guard`) || (skill.index === 4 && skill.type === `guard`)) && t("EntityFullInfoSkill.guardType") || t("EntityFullInfoSkill.damageType");
    const [beforeKey, afterKey] = skill.skillType.split('|').map(s => s.trim());
    const damageOrGuardTypeImgHTML = <img src={`${process.env.PUBLIC_URL}/images/guard-type/${beforeKey}.webp`} alt={`${beforeKey}`}/>;
    const guardDamageType = t("EntityFullInfoSkill.damageType");
    const guardDamageTypeImgHTML = afterKey ? <img src={`${process.env.PUBLIC_URL}/images/general/${afterKey}.webp`} alt={`${afterKey}`}/> : null;

    const sinType = t("EntityFullInfoSkill.sin");
    const sinTypeImgHTML = <img src={`${process.env.PUBLIC_URL}/images/sins/${skill.sin}.webp`} alt={`${skill.sin}`}/>;
    
    const maxCoinBaseValue = Math.sign(growthPerCoin[skill.index]) === -1 ? basicCoin[skill.index] : basicCoin[skill.index] + growthPerCoin[skill.index]*countCoin[skill.index];
    const maxCoinTooltip = t("EntityFullInfoSkill.maxCoin");
    const maxCoinImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/coinBefore.webp`} alt={`${imgUrl}`}/>;

    const maxCoinWithConditionValue = maxCoinValue[skill.index];
    const fullMaxCoinWithConditionValue = fullMaxCoinValue[skill.index];
    const maxCoinWithConditionTooltip = t("EntityFullInfoSkill.coinCondition");
    const maxCoinWithConditionImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/coinCondition.webp`} alt={`max coin with condition`}/>;

    const attackDefLevelValue = maxLvlIdentity + damage[skill.index];
    const attackDefLevelTooltip = ((skill.index === 3 && skill.type === `guard`) || (skill.index === 4 && skill.type === `guard`)) && t("EntityFullInfoSkill.defenseLevel") || t("EntityFullInfoSkill.offenseLevel");
    const attackDefLevelImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/${ ((skill.index !== 3 && skill.type !== `guard`) || (skill.index !== 4 && skill.type !== `guard`)) && `damage` || `evadeDef1`}.webp`} alt={`attack/defense level`}/>;

    const minPossibleDmgValue = minPossibleDmg[skill.index];
    const minPossibleDmgTooltip = t("EntityFullInfoSkill.minPotencial");
    const minPossibleDmgImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/damageMin.webp`} alt={`damageMin`}/>;

    const maxPossibleDmgValue = maxPossibleDmg[skill.index];
    const maxPossibleDmgTooltip = t("EntityFullInfoSkill.maxPotencial");
    const maxPossibleDmgImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/maximumDamage.webp`} alt={`damageMax`}/>;

    const atkSkillsOrderValue = skillsOrder?.[skill.index]?.match(/\d+\.\d+/)?.[0] as string | undefined;
    const defSkillsOrderValue = skillsOrder?.[skill.index]?.match(/\d+/)?.[0] as string | undefined;

    
    const handleMobileTooltipClick = (tooltip:React.ReactNode) =>{
        if(window.innerWidth > mobileLayoutFrom) return;
        setMobileModalTrigger(
            dispatch,
            tooltip
        );
    }
    return (
        <article className={`${'entityFullInfo-skill'}`} >
                    <span className={`${'entityFullInfo-skill-index'}`} >
                        {
                            (atkSkillsOrderValue && defSkillsOrderValue) 
                            ? 
                                (skill.type === "attack")
                                ? `${t("EntityFullInfoSkill.skill")} ${atkSkillsOrderValue}`
                                : skill.type[4] !== `attack` && skill.type[5] !== `attack`
                                ? (identity.guardType.length === 1 
                                    ? t("EntityFullInfoSkill.defSkill") 
                                    : `${t("EntityFullInfoSkill.defSkill")} ${defSkillsOrderValue}`)
                                : t("EntityFullInfoSkill.defSkill")
                            :
                                (skill.type === "attack")
                                ? `${t("EntityFullInfoSkill.skill")} ${skill.index + 1}`
                                : skill.type[4] !== `attack` && skill.type[5] !== `attack`
                                ? (identity.guardType.length === 1 
                                    ? t("EntityFullInfoSkill.defSkill") 
                                    : `${t("EntityFullInfoSkill.defSkill")} ${skill.index + 1 - identity.skillsDmgType.length}`)
                                : t("EntityFullInfoSkill.defSkill")
                        }
                    </span>
                    
                    <div className={`${'entityFullInfo-skill-r'}`}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px", marginBottom: "15px", position: "relative" }}>
                        <p
                            className={`skill-name ${skill.sin}-sin-color`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {nameSkill[skill.index].length > 30 ? `${nameSkill[skill.index].substring(0, 30)}...` : nameSkill[skill.index]}
                        </p>

                        {/* Всплывающая подсказка */}
                        {tooltipVisible && (
                            <div className="tooltip">
                                {nameSkill[skill.index]}
                            </div>
                        )}

                            <span onClick={
                                ()=>{
                                    handleMobileTooltipClick(<TooltipMobile 
                                        text={t("EntityFullInfoSkill.count")} 
                                        header={skill.type === "attack" ? `x${skill.resourceCount}` : ""}
                                    />
                                    )
                                }}
                                className={`${'skill-count'} tooltip-container`} >
                                { skill.resourceCount !== 0 ? `x${skill.resourceCount}` : ""}
                                <span className={`${'entityFullInfo-tooltip'}`} >{t("EntityFullInfoSkill.count")} </span>
                            </span>

                            <span onClick={
                                ()=>{
                                    handleMobileTooltipClick(<TooltipMobile 
                                        text={t("EntityFullInfoSkill.baseValue")} 
                                        header={`${basicCoin[skill.index]}`}
                                    />
                                    )
                                }}
                                className={`${'skill-baseCoin'} tooltip-container coin-text`} >{basicCoin[skill.index]}
                                    <span className={`${'entityFullInfo-tooltip'}`} >{t("EntityFullInfoSkill.baseValue")} </span>
                            </span>

                            <div className='entityFullInfo-coins' >

                                <span onClick={
                                ()=>{
                                    handleMobileTooltipClick(<TooltipMobile 
                                        text={t("EntityFullInfoSkill.coinGain")} 
                                        header={`${growthPerCoin[skill.index]}`}
                                    />
                                    )
                                }}
                                className={`${'skill-coinGrowth'} tooltip-container`} >{Math.sign(growthPerCoin[skill.index]) === -1 ? "": "+"}{growthPerCoin[skill.index]}
                                    <span className={`${'entityFullInfo-tooltip'}`} >{t("EntityFullInfoSkill.coinGain")} </span>
                                </span>

                                    {
                                    coins.map(
                                        (element,index)=>{
                                            return (!unbreakableCoinBuff[index]) ? <img key={index} src={`${process.env.PUBLIC_URL}/images/general/coin.webp`} alt={`coin`}/> : <img key={index} src={`${process.env.PUBLIC_URL}/images/general/unbreakableCoin.webp`} alt={`unbreakableCoin`}/>;
                                        }
                                    )
                                    }
                            </div>
                            </div>
                       
                        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"20px",marginBottom:"15px"}}>
                            
                            <div onClick={
                                ()=>{
                                handleMobileTooltipClick(<TooltipMobile 
                                    image={damageOrGuardTypeImgHTML} 
                                    text={damageOrGuardType} 
                                    />
                                )
                                }
                            } 
                            className={`${'skill-atk'} tooltip-container`} >
                                {damageOrGuardTypeImgHTML}
                                <span className={`${'entityFullInfo-tooltip'}`} >{damageOrGuardType}</span>
                            </div>

                            {
                                (guardDamageTypeImgHTML) ? <div onClick={
                                    ()=>{
                                    handleMobileTooltipClick(<TooltipMobile 
                                        image={guardDamageTypeImgHTML} 
                                        text={guardDamageType} 
                                        />
                                    )
                                    }
                                } 
                                className={`${'skill-atk'} tooltip-container`} >
                                    {guardDamageTypeImgHTML}
                                    <span className={`${'entityFullInfo-tooltip'}`} >{guardDamageType}</span>
                                </div>
                                : <></>
                            }
                            <div onClick={
                                ()=>{
                                    handleMobileTooltipClick(<TooltipMobile 
                                        image={sinTypeImgHTML} 
                                        text={sinType} 
                                    />
                                    )
                                }
                            } 
                            className={`${'skill-atk'} tooltip-container`} >
                                {sinTypeImgHTML}
                                <span className={`${'entityFullInfo-tooltip'}`} >{sinType} </span>
                            </div>
                            
                            <div onClick={
                                ()=>{
                                    handleMobileTooltipClick(<TooltipMobile 
                                        image={maxCoinImgHTML} 
                                        text={maxCoinTooltip} 
                                        header={`${maxCoinBaseValue}`}
                                    />
                                    )
                                }
                            }
                            className={`${'skill-atk'} tooltip-container`} >
                                {maxCoinBaseValue}
                                {maxCoinImgHTML}
                                <span className={`${'entityFullInfo-tooltip'}`} >{maxCoinTooltip}</span>
                            </div>

                            <div onClick={
                                ()=>{
                                    handleMobileTooltipClick(<TooltipMobile 
                                        text={maxCoinWithConditionTooltip}
                                        header={`${maxCoinWithConditionValue}[${fullMaxCoinWithConditionValue}]`}
                                        image={maxCoinWithConditionImgHTML}
                                    />
                                    )
                                }
                            }
                            className={`${'skill-atk'} tooltip-container`} >
                                {maxCoinWithConditionValue}
                                {t('[')}{fullMaxCoinWithConditionValue}{t(']')}
                                {maxCoinWithConditionImgHTML}
                                <span className={`${'entityFullInfo-tooltip'}`} >{maxCoinWithConditionTooltip}</span>
                            </div>

                            <div onClick={
                                ()=>{
                                    handleMobileTooltipClick(<TooltipMobile 
                                        text={attackDefLevelTooltip}
                                        header={`${attackDefLevelValue}`}
                                        image={attackDefLevelImgHTML}
                                    />
                                    )
                                }
                            }
                            className={`${'skill-atk'} tooltip-container`} >
                                {attackDefLevelValue}
                                {attackDefLevelImgHTML}
                                <span className={`${'entityFullInfo-tooltip'}`} >{attackDefLevelTooltip}</span>
                            </div>

                            {
                                minPossibleDmg[skill.index] && <div onClick={
                                    ()=>{
                                        handleMobileTooltipClick(<TooltipMobile 
                                            text={minPossibleDmgTooltip}
                                            header={`${minPossibleDmgValue}`}
                                            image={minPossibleDmgImgHTML}
                                        />
                                        )
                                    }
                                }
                                className={`${'skill-atk'} tooltip-container`} >
                                    {minPossibleDmgValue}
                                    {minPossibleDmgImgHTML}
                                <span className={`${'entityFullInfo-tooltip'}`} >{minPossibleDmgTooltip}</span>
                            </div>
                            }

                            {
                                maxPossibleDmg[skill.index] && <div onClick={
                                    ()=>{
                                        handleMobileTooltipClick(<TooltipMobile 
                                            text={maxPossibleDmgTooltip}
                                            header={`${maxPossibleDmgValue}`}
                                            image={maxPossibleDmgImgHTML}
                                        />
                                        )
                                    }
                                }
                                className={`${'skill-atk'} tooltip-container`} >
                                    {maxPossibleDmgValue}
                                    {maxPossibleDmgImgHTML}
                                <span className={`${'entityFullInfo-tooltip'}`} >{maxPossibleDmgTooltip}</span>
                            </div>
                            }
                          
                            <div style={{textDecoration:"none"}} className={`${'skill-weight'}`} >
                                <span onClick={
                                    ()=>{
                                        handleMobileTooltipClick(<TooltipMobile 
                                            text={t("EntityFullInfoSkill.weightBase")}
                                            header={`${weightCoin[skill.index]}`}
                                        />
                                        )
                                    }
                                } className={`tooltip-container ${'skill-weight'}`} >
                                    {new Array(weightCoin[skill.index]).fill(0).map((e,index)=><div key={index}/>) }
                                    <span className={`${'entityFullInfo-tooltip'}`} >{t("EntityFullInfoSkill.weightBase")}</span>
                                </span>
                                { attackWeightBuff !== 0 && <span onClick={
                                    ()=>{
                                        handleMobileTooltipClick(<TooltipMobile 
                                            text={t("EntityFullInfoSkill.weight")}
                                            header={`${weightCoin[skill.index] + attackWeightBuff}`}
                                        />
                                        )
                                    }
                                }
                                style={{textDecoration:"none"}}  className={`${'skill-weight'} skill-weight--buffed tooltip-container`} >
                                        <span  >|</span>
                                        {new Array(weightCoin[skill.index] + attackWeightBuff).fill(0).map((e,index)=><div key={index}/>) }
                                        <span className={`${'entityFullInfo-tooltip'}`} >{t("EntityFullInfoSkill.weight")}</span>
                                    </span>
                                }
                            </div>
                            
                        </div>

                        <SkillCoinDescription  description={testDescription} />
                    </div>
            </article>
    );
};