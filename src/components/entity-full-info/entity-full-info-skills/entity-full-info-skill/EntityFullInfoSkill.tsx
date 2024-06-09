import React, { useRef } from 'react';
import { IdentityInterface } from '../../../../store/reducers/ids-reducer';
import { ISkill } from '../EntityFullInfoSkills';
import "./EntityFullInfoSkill.css"
import { SkillCoinDescription } from '../../skill-coin-description/SkillCoinDescription';
import { getAtackWeightBonusFromDescription } from '../../../../tools/getAtackWeightBonusFromDescription';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setMobileModalTrigger } from '../../../../store/reducers/mobile-modal-reducer';
import { TooltipMobile } from '../../../tooltip-mobile/TooltipMobile';
import { mobileLayoutFrom } from '../../../../constants/mobileLayoutFrom';
interface IEntityFullInfoProps {
    identity:IdentityInterface;
    skill:ISkill;
}
export const EntityFullInfoSkill:React.FC<IEntityFullInfoProps> = ({identity,skill}) => {
    const {imgUrl,countCoin,basicCoin,weightCoin,growthPerCoin,damage,maxCoinValue,fullMaxCoinValue,maxPossibleDmg,minPossibleDmg} = identity;
    const {t,i18n} = useTranslation();
    
    const nameSkillKey = `nameSkill${i18n.language.toUpperCase()}` as keyof typeof identity;
    const nameSkill = identity[nameSkillKey] as string[];

    const descriptionCoinKey = `descriptionCoin${i18n.language.toUpperCase()}` as keyof typeof identity;
    const descriptionCoin = identity[descriptionCoinKey] as string;

    const descriptionPassive1Key = `descriptionPassive1${i18n.language.toUpperCase()}` as keyof typeof identity;
    const descriptionPassive1 = identity[descriptionPassive1Key] as string;

    const testDescription = descriptionCoin.includes("|") && descriptionCoin.split("|")[skill.index] || "";
    const coins = Array(countCoin[skill.index]).fill(0);
    const attackWeightBuff = getAtackWeightBonusFromDescription([testDescription,descriptionPassive1]);
    const dispatch = useDispatch();

    const damageGuardType = skill.index === 3 && t("EntityFullInfoSkill.guardType") || t("EntityFullInfoSkill.damageType");
    const damageGuardTypeImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/${skill.dmgType}.png`} alt={`${skill.dmgType}`}/>;
    
    const sinType = t("EntityFullInfoSkill.sin");
    const sinTypeImgHTML = <img src={`${process.env.PUBLIC_URL}/images/sins/${skill.sin}.png`} alt={`${skill.sin}`}/>;
    
    const maxCoinBaseValue = Math.sign(growthPerCoin[skill.index]) === -1 ? basicCoin[skill.index] : basicCoin[skill.index] + growthPerCoin[skill.index]*countCoin[skill.index];
    const maxCoinTooltip = t("EntityFullInfoSkill.maxCoin");
    const maxCoinImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/coinBefore.png`} alt={`${imgUrl}`}/>;

    const maxCoinWithConditionValue = maxCoinValue[skill.index];
    const fullMaxCoinWithConditionValue = fullMaxCoinValue[skill.index];
    const maxCoinWithConditionTooltip = t("EntityFullInfoSkill.coinCondition");
    const maxCoinWithConditionImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/coinCondition.png`} alt={`max coin with condition`}/>;

    const maxLvlIdentity = 45; // Максимальный уровень Идентичности
    const attackDefLevelValue = maxLvlIdentity + damage[skill.index];
    const attackDefLevelTooltip = skill.index === 3 && t("EntityFullInfoSkill.defenceLevel") || t("EntityFullInfoSkill.offenceLevel");
    const attackDefLevelImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/${ skill.index !== 3 && `damage` || `evadeDef1`}.png`} alt={`attack/defence level`}/>;

    const minPossibleDmgValue = minPossibleDmg[skill.index];
    const minPossibleDmgTooltip = t("EntityFullInfoSkill.minPotencial");
    const minPossibleDmgImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/damageMin.png`} alt={`damageMin`}/>;

    const maxPossibleDmgValue = maxPossibleDmg[skill.index];
    const maxPossibleDmgTooltip = t("EntityFullInfoSkill.maxPotencial");
    const maxPossibleDmgImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/maximumDamage.png`} alt={`damageMax`}/>;

    const handleMobileTooltipClick = (tooltip:React.ReactNode) =>{
        if(window.innerWidth > mobileLayoutFrom) return;
        setMobileModalTrigger(
            dispatch,
            tooltip
        );
    }
    return (
        <article className={`${'entityFullInfo-skill'}`} >
                    <span className={`${'entityFullInfo-skill-index'}`} >{skill.type === "attack" ? `${t("EntityFullInfoSkill.skill")} ${skill.index+1}`: `${t("EntityFullInfoSkill.defSkill")}`} </span>
                    
                    <div className={`${'entityFullInfo-skill-r'}`}>
                        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"20px",marginBottom:"15px"}}>
                            <p className={`${'skill-name'} ${skill.sin}-sin-color`} >{nameSkill[skill.index]}</p>

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
                                            return <img key={index} src={`${process.env.PUBLIC_URL}/images/general/coin.png`} alt={`coin`}/>
                                        }
                                    )
                                    }
                            </div>
                            </div>
                       
                        <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:"20px",marginBottom:"15px"}}>
                            
                            <div onClick={
                                ()=>{
                                handleMobileTooltipClick(<TooltipMobile 
                                    image={damageGuardTypeImgHTML} 
                                    text={damageGuardType} 
                                    />
                                )
                                }
                            } 
                            className={`${'skill-atk'} tooltip-container`} >
                                {damageGuardTypeImgHTML}
                                <span className={`${'entityFullInfo-tooltip'}`} >{damageGuardType}</span>
                            </div>

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
                                } className={`tooltip-container`} >
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