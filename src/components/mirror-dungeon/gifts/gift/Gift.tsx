import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { mdSelectGiftIdAction } from '../../../../store/reducers/md-reducer';
import { MDGift } from '../../../../types/md-gift-interface';
import { RemoveSVG } from '../../../svg/RemoveSVG';
import './Gift.css';
type GiftData = {
    upgrades: (string|null)[],
    name:string
    obtain:string
} 
type Props = {
  setSelectedUpgrade: Function
  selectedUpgrade:number
}
const romanNumerals:Record<string,string> = {
  5: 'V',
  4: 'IV',
  3: 'III',
  2: 'II',
  1: 'I'
};
export const Gift:React.FC<Props> = ({setSelectedUpgrade,selectedUpgrade}) => {
  const {i18n,t} = useTranslation();
  const {selectedGiftId} = useTypedSelector(store => store.mdReducer);
  const gifts = useQueryClient().getQueryData("md-gifts") as MDGift[]|null;
  const gift = gifts?.find(g=>g.id === selectedGiftId) as MDGift|null;
  const dispatch = useDispatch();
  const giftData:Record<string,GiftData> = {
    "en":{
      upgrades:[gift?.grade1EN||null,gift?.grade2EN||null,gift?.grade3EN||null],
      name:gift?.nameEN || '',
      obtain:gift?.obtainEN || ''
    },
    "ru":{
      upgrades:[gift?.grade1RU||null,gift?.grade2RU||null,gift?.grade3RU||null],
      name:gift?.nameRU || "",
      obtain:gift?.obtainRU || ""
    }
  }
  
  return (
    <div className='gift-wrapper' onClick={()=>mdSelectGiftIdAction(dispatch,null)}>
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
      {
        gift 
        ? <img 
        className='gift-main-img'
        src={`${process.env.PUBLIC_URL}/images/md-gifts/${gift.id}.webp`} 
        alt={giftData[i18n.language].name||""}/>
        : <p> {t("Gift.img")}  </p>
        
      }
      {
        !!gift && <div className={`gift-bar gift-bar--${(gift.id !== "gift_0") ? gift.sin : "none"}`}/>
      }
      {
        !!gift && <>
        <div className={`gift-shadow`}/>
        <RemoveSVG active={false}/>
        </>
      }
      { !!gift && <>
        <button 
          onClick={(e)=>{
            e.stopPropagation();
            setSelectedUpgrade(1);
          }} 
          className={`
          gift-btn-upgrade 
          gift-btn-upgrade--1
          gift-btn-upgrade--${selectedUpgrade === 1 && "selected"}
          `}
          disabled={!giftData[i18n.language].upgrades[0]}
          >
          –
        </button>
        <button 
          onClick={(e)=>{
            e.stopPropagation();
            const currdata = giftData[i18n.language];
            if(!currdata.upgrades[1]) return;
            setSelectedUpgrade(2);
          }} 
          className={`
          gift-btn-upgrade 
          gift-btn-upgrade--2
          gift-btn-upgrade--${selectedUpgrade === 2 && "selected"}
          `}
          disabled={!giftData[i18n.language].upgrades[1]}
          >
            +
        </button>
        <button 
          disabled={!giftData[i18n.language].upgrades[2]}
          onClick={(e)=>{
            e.stopPropagation();
            const currdata = giftData[i18n.language];
            if(!currdata.upgrades[2]) return;
            setSelectedUpgrade(3);
          }} 
          className={`
          gift-btn-upgrade 
          gift-btn-upgrade--3
          gift-btn-upgrade--${selectedUpgrade === 3 && "selected"}
          `}>
          ++
        </button>
        </>
      }

    </div>
  );
};