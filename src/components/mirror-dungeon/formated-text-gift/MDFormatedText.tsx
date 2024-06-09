import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { mdSelectGiftIdAction } from '../../../store/reducers/md-reducer';
import { MDGift } from '../../../types/md-gift-interface';
import './MDFormatedText.css';
const romanNumerals:Record<string,string> = {
    5: 'V',
    4: 'IV',
    3: 'III',
    2: 'II',
    1: 'I'
  };
  const coditionsMap = {
    "[onhit]" : "[При Попадании] ",
    "[clashwin]" : "[При Победе в Столкновении] ",
    "[combatstart]" : "[Начало Боя] ",
    "[clashlose]" : "[При Проигрыше в Столкновении] ",
    "[onuse]" : "[При Использовании] ",
    "[onkill]" : "[При Убийстве] ",
    "[onevade]" : "[При Уклонении] ",
    "[headshit]" : "[Выпала Монетка] ",
    "[hitafterclashwin]" : "[Попадание После Победы в Столконовении] ",
    "[afterattack]" : "[После Атаки] ",
    "[beforeattack]" : "[Перед Атакой] ",
    "[reuse-headshit]" : "[Повторное Применение - Выпала Монетка] ",
    "[tailshit]" : "[Не Выпала Монетка] ",
    "[oncrit]" : "[При Критическом Попадании] ",
    "[indiscriminate]" : "[Без Разбора] ",
    "[headsattackend]" : "[Атака Заканчивается Выпадением Монетки] ",
    "[tailsattackend]" : "[Атака Заканчивается Невыпадением Монетки] ",
    "[failedkill]" : "[Не Удалось Убить] ",
    "[critattackend]" : "[Атака Заканчивается Критическим Попаданием] ",
}
const GiftMapper:React.FC<{value:string}>  = ({value:gift_id}) =>{
    const gifts = useQueryClient().getQueryData("md-gifts") as MDGift[]|null;
    const gift = gifts?.find(g => g.id === gift_id);
    const {i18n} = useTranslation();
    const dispatch = useDispatch();
    if(!gift) return null;
    const name = i18n.language === "ru" ? gift.nameRU :gift.nameEN;

    return <Link 
    to={`/${i18n.language}/mirror-dungeon/gifts`} 
    onClick={()=> mdSelectGiftIdAction(dispatch,gift.id)}>
        <span className="formated-wrapper">
            <img 
            className='small-img'
            src={`${process.env.PUBLIC_URL}/images/md-gifts/${gift.id}.webp`} 
            alt={name}/>
            <div className='big-img--container'>
                <div className='big-img--wrapper'>
                    <img 
                    className='big-img'
                    src={`${process.env.PUBLIC_URL}/images/md-gifts/${gift.id}.webp`} 
                    alt={name}/>
                    {
                        gift.keyword !== "none" && 
                        <img 
                        className='gift-keyword-img'
                        src={
                        ["blunt","pierce","slash"].includes(gift.keyword)
                        ?`${process.env.PUBLIC_URL}/images/dmg-type/${gift.keyword}.png`
                        :`${process.env.PUBLIC_URL}/images/tags/${gift.keyword}.webp`
                        } 
                        alt={gift?.keyword}/>
                    }
                    <span className='gift-tier'> {romanNumerals[gift.tier]} </span>
                </div>
            </div>
            <span className={`MDFormatedText--${gift.sin}`}>{name}</span>
        </span>
    </Link>
}
const CoinsConditionsMapper:React.FC<{value:string}> = ({value}) =>{
    const {t} = useTranslation();
    let keyVal = "";
    let numberVal = "";
    for (let i = 0 ; i < value.length; i++ ){ 
        const currChar = value[i];
        if(isNaN(+currChar) && !(["-","+"].includes(currChar)))  keyVal += currChar;
        else if (currChar !== " ") numberVal += currChar;
    }
    keyVal = keyVal.toLowerCase();
    return <React.Fragment>
    <span className={`coins-coditions coins-coditions--${keyVal}`}>
        {numberVal} 
        {t(`SkillCoinDescription.${keyVal}`)}
    </span>
    </React.Fragment>
}
const ConditionMapper:React.FC<{value:string}> = ({value}) =>{
    const valueAsKey = value.toLowerCase().replace(/\s/g, '');
    const {t} = useTranslation();
    if( valueAsKey in coditionsMap) 
    return <React.Fragment >
    <span className={`condition condition--${valueAsKey.substr(1,valueAsKey.length-2)}`}>
        { t(`SkillCoinDescription.${valueAsKey}`)}
    </span>
    </React.Fragment>
    return <></>;
}
const WeightMapper:React.FC<{value:string}> = ({value}) =>{
    const {t} = useTranslation();
    const [growth , maxCount] = value.split(",");
    const maxCountToNumber = Number(maxCount);
    return <span className="description-weight">
        {Math.sign(+growth) === -1 ? growth : `+${growth}`} {t("SkillCoinDescription.weigth")} 
        {!isNaN(maxCountToNumber) ? ` (${t("SkillCoinDescription.max")} ${maxCountToNumber})` : ""}
    </span>
}
const Reducer = (entiries:[string,React.FC<{value:string}>][], index:number, text:string): React.ReactNode[] => {
    if (index >= entiries.length) return [<React.Fragment key={index}>{text}</React.Fragment>];
    const [SYMBOL, MAPPER] = entiries[index];
    const splitted_text = text.split(SYMBOL);
    const jsx: React.ReactNode[] = splitted_text.reduce((acc: React.ReactNode[], curr, currIndex) => {
        if (currIndex % 2 === 1) {
            acc.push(<MAPPER key={`${index}-${currIndex}`} value={curr} />);
        } else {
            acc.push(...Reducer(entiries, index + 1, curr));
        }
        return acc;
    }, []);
    return jsx;
};
export const MDFormatedText:React.FC<{text:string}> = ({text}) => {
    const specialsMap = {
        "#":GiftMapper,
        "$":ConditionMapper,
        "&":CoinsConditionsMapper,
        "?":WeightMapper,
    }
    const jsx:React.ReactNode[] = Reducer(Object.entries(specialsMap),0,text)
    return (
        <span 
        className='MDFormatedText'>
            {jsx}
        </span>
    );
};