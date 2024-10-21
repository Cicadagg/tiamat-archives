import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { mdSelectGiftIdAction } from '../../../../store/reducers/md-reducer';
import { isGiftFilterMatching } from '../../../../tools/isGiftFilterMatching';
import { MDGift } from '../../../../types/md-gift-interface';
import { AddSVG } from '../../../svg/AddSVG';
import { ChangeSVG } from '../../../svg/ChangeSVG';
import { ChvronUpSVG } from '../../../svg/chevron-up';
import { RemoveSVG } from '../../../svg/RemoveSVG';
import './GiftsList.css';
const romanNumerals:Record<string,string> = {
    5: 'V',
    4: 'IV',
    3: 'III',
    2: 'II',
    1: 'I'
};
export const GiftsList:React.FC = () => {
    const gifts = useQueryClient().getQueryData("md-gifts") as MDGift[]|null;
    const {selectedGiftId} = useTypedSelector(store => store.mdReducer);
    const {value:searchValue} = useTypedSelector(store => store.searchReducer);
    const filterState = useTypedSelector(state => state.filterReducer);

    const {i18n,t} = useTranslation();
    const [sectionsVisibility, setSectionsVisibility] = useState<Record<string,boolean>>({"5":false,"4":false,"3":false,"2":false,"1":false});
    const dispatch = useDispatch();
    if(!gifts) return null;
    const giftsMapped:Record<string , MDGift[]> = gifts.reduce( (acc:Record<string , MDGift[]>,curr)=>{
        const {sin,tier} = curr;
        try{
            if(isGiftFilterMatching(filterState, searchValue, curr, i18n.language))
                acc[`${tier}`].push(curr);
        }catch(e){}
        return acc;
    },{"5":[],"4":[],"3":[],"2":[],"1":[]});

    const svgType = (id:string) => {
        if(selectedGiftId === id) return <RemoveSVG active={false}/>;
        if(!!selectedGiftId) return <ChangeSVG active={false}/>;
        return <AddSVG active={false}/>;
    }

    return (
        <article className='GiftsList-wrapper'>
            <h2>{t(`GiftsList.Gifts`)} ({ Object.entries(giftsMapped).reduce((acc,{1:curr}) => acc+=curr.length,0)})</h2>
            {
                Object.entries(giftsMapped).reverse().map(([key,value])=>{
                    if(value.length === 0) return null;
                    return <section key={key} className='GiftsList-section'>
                        <header onClick={()=>{
                            sectionsVisibility[key] = !sectionsVisibility[key];
                            setSectionsVisibility({ ...sectionsVisibility})
                        }} className={`GiftsList-header GiftsList-header--${sectionsVisibility[key] ? "":"hidden"}`}>
                            <ChvronUpSVG/>
                            {romanNumerals[key]} 
                            {t(`GiftsList.tier`)}
                            {` (${value.length})`}
                        </header>
                        <div className={`GiftsList-content GiftsList-content--${sectionsVisibility[key] ? "":"hidden"}`}>
                            {
                                value.map((gift)=>{
                                    const {cost,nameEN,nameRU,sin,id} = gift;
                                    return <div className='GiftsList-item'>
                                        <figure>
                                            <div
                                            onClick={()=>{
                                                if(selectedGiftId !== gift.id) window.scrollTo(0,0);
                                                mdSelectGiftIdAction(
                                                    dispatch,
                                                    (selectedGiftId === gift.id) ? null : gift.id
                                                )
                                            }}
                                            className='GiftsList-img-wrapper'>
                                                {svgType(id)}
                                                <img 
                                                className='main-img'
                                                src={`${process.env.PUBLIC_URL}/images/md-gifts/${gift.id}.webp`} 
                                                alt={i18n.language === "ru" ? nameRU: nameEN}/>
                                                {
                                                    gift.keyword !== "none" &&
                                                    <img 
                                                    className='keyword-img'
                                                    src={
                                                    ["blunt","pierce","slash"].includes(gift.keyword)
                                                    ?`${process.env.PUBLIC_URL}/images/dmg-type/${gift.keyword}.png`
                                                    :`${process.env.PUBLIC_URL}/images/tags/${gift.keyword}.webp`
                                                    } 
                                                    alt={gift.keyword}/>
                                                }
                                            <div className={`GiftsList-shadow`}/>
                                            <div className={`GiftsList-bar GiftsList-bar--${sin}`}/>
                                            {
                                                (selectedGiftId === gift.id) &&<span className={`GiftsList-item-selected-info`}>
                                                {t(`GiftsList.SELECTED`)}
                                            </span>
                                            }
                                            
                                            </div>
                                            <figcaption> {i18n.language === "ru" ? nameRU: nameEN} </figcaption>
                                        </figure>
                                    </div>
                                })
                            }
                        </div>
                    </section>
                })
            }
        </article>
    );
};