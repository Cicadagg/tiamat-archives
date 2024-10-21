import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { MDEvent } from '../../../../types/md-event-interface';
import { MDGift } from '../../../../types/md-gift-interface';
import { SkillCoinDescription } from '../../../entity-full-info/skill-coin-description/SkillCoinDescription';
import { MDFormatedTextEvent } from '../../formated-text-event/MDFormatedText';
import { MDFormatedText } from '../../formated-text-gift/MDFormatedText';
import { Gift } from '../gift/Gift';
import './GiftsHeader.css';
type GiftData = {
  upgrades: (string|null)[],
  name:string
  obtain:string
  cost:number
}
export const GiftsHeader:React.FC = () => {
  const {t,i18n} = useTranslation();
  const {selectedGiftId} = useTypedSelector(store => store.mdReducer);
  const gifts = useQueryClient().getQueryData("md-gifts") as MDGift[]|null;
  const events = useQueryClient().getQueryData("md-events") as MDEvent[]|null;
  const gift = gifts?.find(g=>g.id === selectedGiftId) as MDGift|null;
  const [selectedUpgrade, setSelectedUpgrade] = useState<number>(1);

  const usedToCraft:string[] = (selectedGiftId && gifts )
  ? gifts.reduce((acc:string[],curr)=>{
    const {id,obtainEN} = curr;
    if(obtainEN.includes(`#${selectedGiftId}#`)) 
    acc.push(`#${id}#`);
    return acc;
  },[])
  : []

  const giftEvents:string[] = (selectedGiftId && events )
  ? events.reduce((acc:string[],curr)=>{
    const {id,choiceEN} = curr;
    if(choiceEN.gift_id === (selectedGiftId) || choiceEN.gift_id?.includes(selectedGiftId)) 
    acc.push(`${id}`);
    return acc;
  },[])
  : []
  useEffect(() => {
    setSelectedUpgrade(1);
  }, [selectedGiftId]);
  
  const giftData:Record<string,GiftData> = {
    "en":{
      upgrades:[gift?.grade1EN||null,gift?.grade2EN||null,gift?.grade3EN||null],
      name:gift?.nameEN || '',
      obtain:gift?.obtainEN || '',
      cost:(gift) ? Number(gift.cost) : NaN
    },
    "ru":{
      upgrades:[gift?.grade1RU||null,gift?.grade2RU||null,gift?.grade3RU||null],
      name:gift?.nameRU || "",
      obtain:gift?.obtainRU || "",
      cost:(gift) ? Number(gift.cost) : NaN

    }
  }
  return (
    <div className='GiftsHeader-container'>
      <div className='GiftsHeader-name'>
        {
          gift 
          ?<span> {i18n.language === "ru" ? gift.nameRU:gift.nameEN}</span>
          :<span> {t("GiftsHeader.name")}</span>
        }
      </div>
<div className='GiftsHeader-wrapper'>
      <Gift selectedUpgrade={selectedUpgrade} setSelectedUpgrade={useCallback(setSelectedUpgrade,[])}/>
      
      <div className='GiftsHeader-desc'>
        {
          gift 
          ?<SkillCoinDescription description={giftData[i18n.language].upgrades[selectedUpgrade-1]||''}/>
          :<span className='GiftsHeader-centered'> {t("GiftsHeader.description")}</span>
        }
      </div>

      <div className='GiftsHeader-info'>
        {
          gift 
          ? <>
            <span >
              <span className='GiftsHeader-highlight-text'>
                {t("GiftsHeader.obtain")} 
              </span>
              <MDFormatedText text={`${giftData[i18n.language].obtain}`||''}/>
            </span>
            {
              !!giftEvents.length && giftEvents.map(g=>{
                return <MDFormatedTextEvent eventID={g} key={g}/>
              })
            }
          { giftData[i18n.language].cost &&<>
            {!giftData[i18n.language].obtain.includes("#gift") &&
              <span>
                <span className='GiftsHeader-highlight-text'>
                  {t("GiftsHeader.buy")}
                </span>
                {
                  (giftData[i18n.language].cost == 1) ? "?" : giftData[i18n.language].cost
                } 
              </span>
            }
            <span>
              <span className='GiftsHeader-highlight-text'>
                {t("GiftsHeader.sell")}
              </span>
              {
              (giftData[i18n.language].cost == 1) ? "?" : Math.ceil(giftData[i18n.language].cost/2)
              } 
            </span>
            {
              !!usedToCraft.length &&
              <span >
                <span className='GiftsHeader-highlight-text'>
                  {t("GiftsHeader.craft")}
                </span>
                <MDFormatedText text={` ${usedToCraft.join()}`||''}/>
              </span>
            }
          </>
          }
          </>
          : <span className='GiftsHeader-centered'>  
          {t("GiftsHeader.additionalInfo")} 
          </span>
        }
      </div>

    </div>
    </div>
    
  );
};