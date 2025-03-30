import React from 'react';
import "./EntityFullInfoSkill.css"
import { EGOInterface } from '../../../../store/reducers/ego-reducer';
import { SkillCoinDescription } from '../../skill-coin-description/SkillCoinDescription';
import { getAtackWeightBonusFromDescription } from '../../../../tools/getAtackWeightBonusFromDescription';
import { useTranslation } from 'react-i18next';
import { setMobileModalTrigger } from '../../../../store/reducers/mobile-modal-reducer';
import { mobileLayoutFrom } from '../../../../constants/mobileLayoutFrom';
import { useDispatch } from 'react-redux';
import { TooltipMobile } from '../../../tooltip-mobile/TooltipMobile';
import { getUnbreakableCoinBonusFromDescription } from '../../../../tools/getUnbreakableCoinBonusFromDescription';
import { ISkillEGO } from '../EntityFullInfoSkillsEGO';

interface IEntityFullInfoProps {
    ego: EGOInterface;
    skill: ISkillEGO;
}

export const EntityFullInfoSkillEGO: React.FC<IEntityFullInfoProps> = ({ ego, skill }) => {
    const { imgUrl, basicCoin, weightCoin, growthPerCoin, maxCoinValue, sanity, countCoin, clashCoinValue, damage } = ego;
    const { coins: coinsCount } = skill;
    const coins = new Array(coinsCount).fill(1);
    const { t, i18n } = useTranslation();

    const nameSkillKey = `nameSkill${i18n.language.toUpperCase()}` as keyof typeof ego;
    const nameSkill = ego[nameSkillKey] as string;

    const descriptionCoinKey = `descriptionCoin${i18n.language.toUpperCase()}` as keyof typeof ego;
    const descriptionCoin = ego[descriptionCoinKey] as string;

    const descriptionPassiveKey = `descriptionPassive${i18n.language.toUpperCase()}` as keyof typeof ego;
    const descriptionPassive = ego[descriptionPassiveKey] as string;

    const testDescription = descriptionCoin.includes("|") && descriptionCoin.split("|")[skill.index] || descriptionCoin;
    const attackWeightBuff = getAtackWeightBonusFromDescription([testDescription, descriptionPassive]);
    const unbreakableCoinBuff = getUnbreakableCoinBonusFromDescription(testDescription, countCoin[skill.index]);
    const dispatch = useDispatch();

    const damageGuardType = t("EntityFullInfoSkillEGO.damageType");
    const damageGuardTypeImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/${skill.dmgType}.webp`} alt={`${skill.dmgType}`} />;

    const sinType = t("EntityFullInfoSkillEGO.sin");
    const sinTypeImgHTML = <img src={`${process.env.PUBLIC_URL}/images/sins/${skill.sin}.webp`} alt={`${imgUrl}`} />;

    const maxCoinBaseValue = Math.sign(growthPerCoin[skill.index]) === -1
        ? basicCoin[skill.index]
        : basicCoin[skill.index] + growthPerCoin[skill.index] * coinsCount;

    const maxCoinTooltip = t("EntityFullInfoSkillEGO.maxCoin");
    const maxCoinImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/coinBefore.webp`} alt={`${imgUrl}`} />;

    const maxCoinWithConditionValue = maxCoinValue[skill.index];
    const clashCoinWithConditionValue = clashCoinValue[skill.index];
    const maxCoinWithConditionTooltip = t("EntityFullInfoSkillEGO.coinCondition");
    const maxCoinWithConditionImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/coinCondition.webp`} alt={`${imgUrl}`} />;

    // Новая строка кода
    const baseDamageBonus = 50; // Изменяемое значение
    const damageValue = Number(damage[skill.index]) || 0;
    const attackDefLevelValue = damageValue + baseDamageBonus;
    const attackDefLevelTooltip = t("EntityFullInfoSkillEGO.offenseLevel");
    const attackDefLevelImgHTML = <img src={`${process.env.PUBLIC_URL}/images/general/damage.webp`} alt={`attack level`} />;

    const handleMobileTooltipClick = (tooltip: React.ReactNode) => {
        if (window.innerWidth > mobileLayoutFrom) return;
        setMobileModalTrigger(
            dispatch,
            tooltip
        );
    }

    return (
        <article className={`${'entityFullInfo-skill'}`} >
            <div className={`${'entityFullInfo-skill-r'}`}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px", marginBottom: "15px" }}>
                    <p className={`${'skill-name'} ${skill.sin}-sin-color`}>
                        {skill.index === 0 && <span >{`[${t("EntityFullInfoSkillEGO.awakening")}]`}</span>}
                        {skill.index === 1 && <span style={{ color: "dark-red" }}>{`[${t("EntityFullInfoSkillEGO.corrosion")}]`}</span>}
                    </p>

                    <span onClick={() => {
                        handleMobileTooltipClick(<TooltipMobile
                            text={t("EntityFullInfoSkillEGO.baseValue")}
                            header={`${basicCoin[skill.index]}`}
                        />)
                    }}
                        className={`${'skill-baseCoin'} tooltip-container coin-text`} >{basicCoin[skill.index]}
                        <span className={`${'entityFullInfo-tooltip'}`} > {t("EntityFullInfoSkillEGO.baseValue")}</span>
                    </span>

                    <div className='entityFullInfo-coins' >
                        <span onClick={() => {
                            handleMobileTooltipClick(<TooltipMobile
                                text={t("EntityFullInfoSkillEGO.coinGain")}
                                header={`${growthPerCoin[skill.index]}`}
                            />)
                        }}
                            className={`${'skill-coinGrowth'} tooltip-container`} >{Math.sign(growthPerCoin[skill.index]) === -1 ? "" : "+"}{growthPerCoin[skill.index]}
                            <span className={`${'entityFullInfo-tooltip'}`} >{t("EntityFullInfoSkillEGO.coinGain")}</span>
                        </span>

                        {coins.map((element, index) => {
                            return (!unbreakableCoinBuff[index]) ? <img key={index} src={`${process.env.PUBLIC_URL}/images/general/coin.webp`} alt={`coin`} /> : <img key={index} src={`${process.env.PUBLIC_URL}/images/general/unbreakableCoin.webp`} alt={`unbreakableCoin`} />;
                        })}
                    </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px", marginBottom: "15px" }}>
                    <div onClick={() => {
                        handleMobileTooltipClick(<TooltipMobile
                            text={damageGuardType}
                            image={damageGuardTypeImgHTML}
                        />)
                    }}
                        className={`${'skill-atk'} tooltip-container`} >
                        {damageGuardTypeImgHTML}
                        <span className={`${'entityFullInfo-tooltip'}`} >{damageGuardType}</span>
                    </div>

                    <div onClick={() => {
                        handleMobileTooltipClick(<TooltipMobile
                            text={sinType}
                            image={sinTypeImgHTML}
                        />)
                    }}
                        className={`${'skill-atk'} tooltip-container`} >
                        {sinTypeImgHTML}
                        <span className={`${'entityFullInfo-tooltip'}`} >{sinType}</span>
                    </div>

                    {/* Добавленный блок */}
                    <div onClick={() => {
                        handleMobileTooltipClick(<TooltipMobile
                            text={attackDefLevelTooltip}
                            header={`${attackDefLevelValue}`}
                            image={attackDefLevelImgHTML}
                        />)
                    }}
                        className={`${'skill-atk'} tooltip-container`} >
                        {attackDefLevelValue}
                        {attackDefLevelImgHTML}
                        <span className={`${'entityFullInfo-tooltip'}`} >{attackDefLevelTooltip}</span>
                    </div>
                    {/* Конец добавленного блока */}

                    <div onClick={() => {
                        handleMobileTooltipClick(<TooltipMobile
                            text={maxCoinTooltip}
                            image={maxCoinImgHTML}
                            header={`${maxCoinBaseValue}`}
                        />)
                    }}
                        className={`${'skill-atk'} tooltip-container`} >
                        {maxCoinBaseValue}
                        {maxCoinImgHTML}
                        <span className={`${'entityFullInfo-tooltip'}`} >{maxCoinTooltip}</span>
                    </div>

                    <div onClick={() => {
                        handleMobileTooltipClick(<TooltipMobile
                            text={maxCoinWithConditionTooltip}
                            image={maxCoinWithConditionImgHTML}
                            header={`${maxCoinWithConditionValue}`}
                        />)
                    }}
                        className={`${'skill-atk'} tooltip-container`} >
                        {maxCoinWithConditionValue}
                        {t('[')}{clashCoinWithConditionValue}{t(']')}
                        {maxCoinWithConditionImgHTML}
                        <span className={`${'entityFullInfo-tooltip'}`} >{maxCoinWithConditionTooltip}</span>
                    </div>

                    <div style={{ textDecoration: "none" }} className={`${'skill-weight'}`} >
                        <span onClick={() => {
                            handleMobileTooltipClick(<TooltipMobile
                                text={t("EntityFullInfoSkillEGO.weightBase")}
                                header={`${weightCoin[skill.index]}`}
                            />)
                        }}
                            style={{ display: "flex", flexDirection: "row", gap: "5px" }} className={`tooltip-container`} >
                            {new Array(weightCoin[skill.index]).fill(0).map((e, index) => <div key={index} />)}
                            <span className={`${'entityFullInfo-tooltip'}`} >{t("EntityFullInfoSkillEGO.weightBase")}</span>
                        </span>

                        {attackWeightBuff !== 0 && <span onClick={() => {
                            handleMobileTooltipClick(<TooltipMobile
                                text={t("EntityFullInfoSkillEGO.weight")}
                                header={`${weightCoin[skill.index] + attackWeightBuff}`}
                            />)
                        }}
                            style={{ textDecoration: "none", display: "flex", flexDirection: "row", gap: "5px" }} className={`${'skill-weight'} skill-weight--buffed tooltip-container`} >
                            <span  >|</span>
                            {new Array(weightCoin[skill.index] + attackWeightBuff).fill(0).map((e, index) => <div key={index} />)}
                            <span className={`${'entityFullInfo-tooltip'}`} >{t("EntityFullInfoSkillEGO.weight")}</span>
                        </span>}
                    </div>
                </div>
                <SkillCoinDescription description={testDescription} />
            </div>
        </article>
    );
};
