import React from 'react';
import { useTranslation } from 'react-i18next';
import { IdentityInterface } from '../../../../store/reducers/ids-reducer';
import { SkillCoinDescription } from '../../skill-coin-description/SkillCoinDescription';
import './EntityFullInfoSanity.css';

export const EntityFullInfoSanity:React.FC<{identity:IdentityInterface}> = ({identity}) => {
    const {t,i18n} = useTranslation();
    const {sanityInfoEN,sanityInfoRU} = identity;
    const panicEffects = t("EntityFullInfoSanity.PanicTypes");
    const factorsIncreasingSanity = t("EntityFullInfoSanity.FactorsIncreasingSanity");
    const factorsDecreasingSanity = t("EntityFullInfoSanity.FactorsDecreasingSanity");
    const sanityBase = (i18n.language === "ru") ? sanityInfoRU : sanityInfoEN;
    const panicEffectsIndx = sanityBase.indexOf(panicEffects);
    const factorsIncreasingSanityIndx = sanityBase.indexOf(factorsIncreasingSanity);
    const factorsDecreasingSanityIndx = sanityBase.indexOf(factorsDecreasingSanity);

    const sections = [
        sanityBase.substring(panicEffectsIndx + panicEffects.length , factorsIncreasingSanityIndx),
        sanityBase.substring(factorsIncreasingSanityIndx + factorsIncreasingSanity.length,factorsDecreasingSanityIndx),
        sanityBase.substring(factorsDecreasingSanityIndx+factorsDecreasingSanity.length)
    ];

    const handleHeader = (index:number) => {
        switch(index){
            case 0:
                return panicEffects;
            case 1:
                return factorsIncreasingSanity;
            case 2:
                return factorsDecreasingSanity;
            default:
                return "";
        }
    }
    const handleSanityImgName = (index:number) => {
        switch(index){
            case 0:
                return "sanity";
            case 1:
                return "sanityPlus";
            case 2:
                return "sanityDrop";
            default:
                return "sanity";
        }
    }
    return (
        <>
        {sections.map((s,index)=>{
            return <article key={index} className={`${'entityFullInfo-sanity'}`} >
                <span className={`entityFullInfo-sanity-header entityFullInfo-sanity-header-${index}`}>
                    {handleHeader(index)}
                </span>
                <img src={`${process.env.PUBLIC_URL}/images/general/${handleSanityImgName(index)}.webp`} alt={`${handleSanityImgName(index)}`} className={`${'entityFullInfo-sanity-img'}`}/>
                <SkillCoinDescription description={s} />
            </article>
            })
        }
        </>
    
    );
};