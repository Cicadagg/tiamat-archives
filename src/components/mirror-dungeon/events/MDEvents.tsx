import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import { mobileLayoutFrom } from '../../../constants/mobileLayoutFrom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { isEventFilterMatching } from '../../../tools/isEventFilterMatching';
import { MDEvent } from '../../../types/md-event-interface';
import { Search } from '../../search/Search';
import { MDEventOption, Option } from './option/MDEventOption';
import { createGiftList } from '../formated-text-gift/MDFormatedText';
import './MDEvents.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
export const MDEvents:React.FC = () => {
    const events = useQueryClient().getQueryData("md-events") as MDEvent[]|null;
    const {t, i18n} = useTranslation();
    const {value} = useTypedSelector(store => store.searchReducer);
    const [animatedId, setAnimatedId] = useState<null|string>(null);
    const [animationTriggered, setAnimationTriggered] = useState<boolean>(false);
    
    const sectionRefs = useRef<HTMLElement[]>([]);
    
    const addToRefs = (el:any) => {
        if (el && !sectionRefs.current.includes(el)) {
        sectionRefs.current.push(el);
        }
    };

    const scrollToSection = (id:any) => {
        const section = sectionRefs.current.find((ref) => ref.id === id);
        if (section) {
            const sectionRect = section.getBoundingClientRect();
            const offset = sectionRect.top + window.pageYOffset - (window.innerHeight / 2) + (sectionRect.height / 2);
            window.scrollTo({
                top: offset - ((mobileLayoutFrom >= window.innerWidth) ? 70 : 0),
                behavior: 'auto'
            });
        }
    };
    const query = useQuery();

    useEffect(() => {
        const id = query.get('id');
        let timer:NodeJS.Timeout|null = null;
        if (id && !animationTriggered) {
            scrollToSection(id);
            setAnimatedId(id);
            timer = setTimeout(()=> setAnimationTriggered(true) , 2200)
        }
        return ()=>{
            if(timer) clearTimeout(timer);
        }
    }, [query]);

    const filteredData = (events) 
    ? events.reduce((acc:MDEvent[],curr)=>{
        if(isEventFilterMatching(value,curr,i18n.language))
            acc.push(curr);
        return acc;
    },[])
    : [];
  return (
    <div className='MDEvents'>
        <h2> {t("MirrorDungeonNav.events")} ({(filteredData.length)})</h2>
        <Search/>
        {
            filteredData.map(e=>{
                const {id,abnoEN,abnoRU,choiceEN,choiceRU} = e;
                return <section 
                ref={addToRefs} 
                id={id} 
                className={`MDEvents-section MDEvents-section--${id === animatedId && !animationTriggered && "animated"}`}>
                    <header>
                        <h3>{(i18n.language === "ru") ? abnoRU:abnoEN}</h3>
                        <img src={`${process.env.PUBLIC_URL}/images/md-events/${id}.webp`} alt={(i18n.language === "ru") ? abnoRU:abnoEN}/>
                        <span className='MDEvents-ego-gifts-span'>
                            {t("MDEventOption.gifts_list_header")}
                        </span>
                        <div className='MDEvents-ego-gifts-section'>
                            {createGiftList((i18n.language === "ru") ? choiceRU.gift_id : choiceEN.gift_id, t)}
                        </div>
                    </header>
                    <MDEventOption option={(i18n.language === "ru") ? choiceRU:choiceEN} />

                </section>
            })
        }
    </div>
  );
};