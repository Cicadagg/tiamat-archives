import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { mdSelectGiftIdAction } from '../../../../store/reducers/md-reducer';
import { MDGift } from '../../../../types/md-gift-interface';
import './MDCrafts.css';
type Craft = {
    requirements: string[],
    result: string
}
const romanNumerals:Record<string,string> = {
    5: 'V',
    4: 'IV',
    3: 'III',
    2: 'II',
    1: 'I'
  };
const GiftItem: React.FC<{ gift: MDGift }> = ({ gift }) => {
    const dispatch = useDispatch();
    const {i18n,t} = useTranslation();
    const {nameRU,nameEN,sin} = gift;
    return <div className='GiftItem-item'>
        <picture>
            <Link to={`/${i18n.language}/mirror-dungeon/gifts`}
                onClick={() => {
                    mdSelectGiftIdAction(
                        dispatch,
                        gift.id
                    )
                }}
                className='GiftItem-img-wrapper'>
                <img
                    src={`${process.env.PUBLIC_URL}/images/md-gifts/${gift.id}.webp`}
                    alt={i18n.language === "ru" ? nameRU : nameEN} />
                <div className={`GiftItem-bar GiftItem-bar--${(gift.id !== "gift_0") ? sin : "none"}`} />
                {
                    !!gift && <span className='gift-tier'> {romanNumerals[gift.tier]} </span>
                }
                {
                    !!gift && gift.keyword !== "none" && 
                    <img 
                    className='gift-keyword-img'
                    src={
                    ["blunt","pierce","slash"].includes(gift.keyword)
                    ?`${process.env.PUBLIC_URL}/images/dmg-type/${gift.keyword}.webp`
                    :`${process.env.PUBLIC_URL}/images/tags/${gift.keyword}.webp`
                    } 
                    alt={gift?.keyword}/>
                }
                <div className={`GiftItem-shadow`} />
                <div className={`GiftItem-info GiftItem-info--${i18n.language}`} >{t(`GiftItem.info`)}</div>
                
            </Link>
            <caption> 
                {(() => {
                    const name = i18n.language === "ru" ? nameRU : nameEN;
                    return name.length > 9 ? `${name.slice(0, 9)}...` : name;
                })()} 
            </caption>
        </picture>
    </div>
}

export const MDCrafts: React.FC = () => {
    const gifts = useQueryClient().getQueryData("md-gifts") as MDGift[] | null;
    const {i18n,t} = useTranslation();

    if (!gifts) return null;

    const crafts: Craft[] = gifts.reduce((acc: Craft[], curr) => {
        const { obtainEN, id } = curr;
        if (id === "gift_0") return acc; // gift_0, не должен отображаться на вкладке крафтов, так как является пустым гифтом
        if (!obtainEN.includes("#")) return acc;
        const splitted = obtainEN.split("#");
        if (splitted.length % 2 != 1) return acc;
        const requirements = [];
        for (let i = 1; i < splitted.length; i += 2) {
            requirements.push(splitted[i])
        }
        acc.push({
            requirements,
            result: id
        })
        return acc;
    }, []);
    
    return (
        <div className='MDcrafts-wrapper'>
            <h2> {t(`GiftItem.crafts`)} ({crafts.length})</h2>
            {
                crafts.map((c, index) => {
                    const { requirements, result } = c;
                    const gift =  gifts.find(g => g.id === result);
                    if(!gift) return null;

                    return <div className='MDcrafts-line' key={index}>
                        
                        <div className='MDcrafts-req'>
                            {requirements.map((r,index)=>{
                                const gift = gifts.find(g => g.id === r);
                                if(!gift){
                                    return null;
                                } 
                                return <>
                                <GiftItem gift={gift} key={index}/>
                                {(index !== requirements.length -1 ) 
                                ? <div className='MDcrafts-sign'>+</div>
                                : <></>}
                                </>
                            })}
                        </div>
                        <div className='MDcrafts-sign'>
                            =
                        </div>
                        <div className='MDcrafts-result'>
                            <GiftItem gift={gift}/>
                        </div>

                    </div>
                })
            }
        </div>
    );
};