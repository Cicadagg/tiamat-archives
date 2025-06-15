import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setMobileModalTrigger } from '../../../store/reducers/mobile-modal-reducer';
import { StatusesInterface } from '../../../store/reducers/statuses-reducer';
import { IdentityInterface } from '../../../store/reducers/ids-reducer';
import { EGOInterface } from '../../../store/reducers/ego-reducer';
import { MDGift } from '../../../types/md-gift-interface';
import { TooltipMobile } from '../../tooltip-mobile/TooltipMobile';
import "./SkillCoinDescription.css";
import { ItemEntity } from '../../item-entity/ItemEntity';
import "../../item-entity/ItemEntity.css"
import { mdSelectGiftIdAction } from '../../../store/reducers/md-reducer';
import { AddSVG } from '../../svg/AddSVG';
import '../../mirror-dungeon/gifts/list/GiftsList.css';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { RemoveSVG } from '../../svg/RemoveSVG';
import { ChangeSVG } from '../../svg/ChangeSVG';
import { Link } from 'react-router-dom';
import { useQueryClient } from "react-query";
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';
import { ArrowsRightNavigateSVG } from '../../svg/ArrowsRightNavigate';

interface ISkillCoinDescriptionProps {
    description: React.ReactNode;  // Поддерживаем ReactNode
}
interface Gift {
    id: string;
    nameEN: string;
    nameRU: string;
    sin: string;
    keyword: string;
}

const romanNumerals:Record<string,string> = {
    5: 'V',
    4: 'IV',
    3: 'III',
    2: 'II',
    1: 'I'
  };

export const SkillCoinDescription: React.FC<ISkillCoinDescriptionProps> = ({ description }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const statuses = useQueryClient().getQueryData('statuses') as StatusesInterface[];
    const ids = useQueryClient().getQueryData('identities') as IdentityInterface[];
    const egos = useQueryClient().getQueryData('ego') as EGOInterface[];
    const gifts = useQueryClient().getQueryData('md-gifts') as MDGift[];


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
        "[turnend]" : "[Конец Хода]",
        "[skillend]" : "[Конец Скилла] ",
        "[oncritkill]": "[При Убийстве Критическим Попаданием] ",
        "[beforeuse]":"[Перед Использованием] ",
        "[clashablecounter]":"[Столкновение при Контратаке] ",
        "[onallykill]":"[При Убийстве Союзника] ",
        "[onallykillfail]":"[Неудача при Убийстве Союзника] ",
        "[onhitwithoutcracking]":"[При атаке без Стеггера] ",
        "[ontargetkill]":"[При убийстве цели] ",
        "[turnstart]":"[Начало Хода] ",
        "[encounterstart]":"[Начало Столкновения] ",
        "[beforegettinghit]":"[До Получение Попадания] ",
        "[reuseonhit]" : "[Повторное Применение - При Попадании] ",
        "[onunopposedattack]" : "[При Атаке в Одностороннем Порядке] ",
    }


    const svgType = (id:string) => {
        if(selectedGiftId === id) return <RemoveSVG active={false}/>;
        if(!!selectedGiftId) return <ChangeSVG active={false}/>;
        return <AddSVG active={false}/>;
    }

    const NavLink:React.FC<{to:string,text:string}> = ({to,text}) =>{
        const containerRef = useRef(null);
        const {isVisible} = useIntersectionObserver(containerRef,0.1)
        return(
            <Link to={to} ref={containerRef} className={`nav-link ${isVisible && "nav-link--animated"}`}>
                {text}
                <ArrowsRightNavigateSVG />
            </Link>
        )
    }

    const linkFunc = (value: string, tracked: {text: string, link: string}) => {
        return <NavLink key={tracked.text} to={tracked.link} text={tracked.text}/>
    }

    const GiftDisplay = ({ giftId }: { giftId: string }) => {
        const dispatch = useDispatch();
        const { i18n } = useTranslation();
    
        const gift = gifts.find((g: Gift) => g.id === giftId);
    
        if (!gift) return null;
    
        const { nameEN, nameRU, sin, id, keyword } = gift;
    
        return (
            <Link to={`/${i18n.language}/mirror-dungeon/gifts`} onClick={() => mdSelectGiftIdAction(dispatch, gift.id)}>
                <div className='guide-gift-item'>
                    <figure>
                        <div className='guide-gift-wrapper'>
                            {svgType(id)}
                            <img 
                                className='guide-gift-main-img' 
                                src={`${process.env.PUBLIC_URL}/images/md-gifts/${id}.webp`} 
                                alt={i18n.language === "ru" ? nameRU : nameEN}
                            />
                            {keyword !== "none" && (
                                <img 
                                    className='guide-gift-keyword'
                                    src={
                                        ["blunt", "pierce", "slash"].includes(keyword)
                                        ? `${process.env.PUBLIC_URL}/images/dmg-type/${keyword}.webp`
                                        : `${process.env.PUBLIC_URL}/images/tags/${keyword}.webp`
                                    } 
                                    alt={keyword}
                                />
                            )}
                            <div className="guide-gift-shadow" />
                            <div className={`guide-gift-bar guide-gift-bar--${sin}`} />
                        </div>
                        {
                            !!gift && <span className='gift-tier'> {romanNumerals[gift.tier]} </span>
                        }
                        <figcaption>
                            {i18n.language === "ru" ? nameRU : nameEN}
                        </figcaption>
                    </figure>
                </div>
            </Link>
        );
    };
    
    const giftFunc = (value: string, tracked: { giftId: string; index: number }) => {
        return <GiftDisplay giftId={tracked.giftId} />;
    };

    const egoFunc = (value: string, tracked: { idId: string; index: number }) => {
        for (let ego of egos){
            if (ego.imgUrl === tracked.idId){
                return (
                    <span style={{display: "inline-block"}}>
                        <ItemEntity key={ego.imgUrl} entity={ego}/>
                    </span>
                );
            }
        }
        for (let id of ids){
            if (id.imgUrl === tracked.idId){
                return (
                    <span style={{display: "inline-block"}}>
                        <ItemEntity key={id.imgUrl} entity={id}/>
                    </span>
                );
            }
        }
    };

    const tagFunc = (value: string, tracked: { coinIndex: number; index: number }) => {
        const status = statuses.find((s: StatusesInterface) => s.id === value);
        if (!status) return null;
    
        const descriptionKey = `description${i18n.language.toUpperCase()}` as keyof typeof status;
        const descriptionText = status[descriptionKey] as string;
    
        const nameKey = `name${i18n.language.toUpperCase()}` as keyof typeof status;
        const name = status[nameKey] as string;
    
        const imgHTML = <img className="guide-status" style={{width: "25px", height: "25px", objectPosition: "center", objectFit: "contain", marginBottom: "-5px", marginTop: "0px"}} src={`${process.env.PUBLIC_URL}/images/tags/${value}.webp`} alt={value} />;
        const imgMobileHTML = <img className="status" src={`${process.env.PUBLIC_URL}/images/tags/${value}.webp`} alt={value} />;
        const mobileModalHTML = <TooltipMobile image={imgMobileHTML} header={name} text={descriptionText} />;
    
        // Определяем класс для status-name на основе значения status.tip
        let statusNameClass = 'status-name';
        if (status.tip === 'baf') {
            statusNameClass = 'status-name2';
        } else if (status.tip === 'debaf') {
            statusNameClass = 'status-name'; // Или какой-то другой класс, если нужно
        } else if (status.tip === 'pas') {
            statusNameClass = 'status-name3'; // Или какой-то другой класс, если нужно
        }
    
        return (
            <React.Fragment key={tracked.coinIndex}>
                {imgHTML}
                <span
                    onClick={() => {
                        setMobileModalTrigger(dispatch, mobileModalHTML);
                    }}
                    // Используем динамический класс
                    className={`${statusNameClass} status-name--${value} tooltip-container tooltip--status`}
                >
                    {name}
                    <span className="entityFullInfo-tooltip tooltip-container--status">
                        {t("SkillCoinDescription.clickToSeeDescription")}
                    </span>
                </span>
            </React.Fragment>
        );
    };
    

    const specialsMap = {
        "#": tagFunc,
        "&": egoFunc,
        "@": giftFunc,
        "~": linkFunc
    };

    const {selectedGiftId} = useTypedSelector(store => store.mdReducer);

    const coinFunc = (value:string,result:React.ReactNode[],tracked:{coinIndex:number,index:number}) =>{
        if(isNaN(+value)) return value;
        return <React.Fragment key={result.length}>
        {!!result.length && <br/> }
        <img className="coin" src={`${process.env.PUBLIC_URL}/images/general/coin${value}.webp`} alt="coinN"/>
        </React.Fragment>
    }

    const conditionFunc = (value:string,result:React.ReactNode[],tracked:{coinIndex:number,index:number}) =>{
        const valueAsKey = value.toLowerCase().replace(/\s/g, '');

        const isCloseToCoin = tracked.coinIndex + 1 === tracked.index;

        if( valueAsKey in coditionsMap) 
        return <React.Fragment key={result.length}>
        {(!isCloseToCoin && !!result.length) && <br/>}
        <span className={`condition condition--${valueAsKey.substr(1,valueAsKey.length-2)}`}>
            { t(`SkillCoinDescription.${valueAsKey}`)}
        </span>
        </React.Fragment>
        return "";
    }

    const coinsConditionsFunc = (value:string,result:React.ReactNode[],tracked:{coinIndex:number,index:number}) =>{
        let keyVal = "";
        let numberVal = "";
        for (let i = 0 ; i < value.length; i++ ){ 
            const currChar = value[i];
            if(isNaN(+currChar) && !(["-","+"].includes(currChar)))  keyVal += currChar;
            else if (currChar !== " ") numberVal += currChar;
        }
        keyVal = keyVal.toLowerCase();
        return <React.Fragment key={result.length}>
        <span className={`coins-coditions coins-coditions--${keyVal}`}>
            {numberVal} 
            {t(`SkillCoinDescription.${keyVal}`)}
        </span>
        </React.Fragment>
    }
    const weightFunc = (value:string,result:React.ReactNode[],tracked:{coinIndex:number,index:number}) =>{
        const [growth , maxCount] = value.split(",");
        const maxCountToNumber = Number(maxCount);
        return <span className="description-weight">
            {Math.sign(+growth) === -1 ? growth : `+${growth}`} {t("SkillCoinDescription.weigth")} 
            {!isNaN(maxCountToNumber) ? ` (${t("SkillCoinDescription.max")} ${maxCountToNumber})` : ""}
        </span>
    }

    // Функции для обработки символов внутри <e></e>
    type ESpecialFunc = (
        value: string, 
        result: React.ReactNode[], 
        tracked: { coinIndex: number; index: number }
    ) => React.ReactNode;

    // Обновленный stSpecialsMap
    const stSpecialsMap: Record<string, ESpecialFunc> = {
        "@": coinFunc,
        "$": conditionFunc,
        "?": weightFunc,
        "&": coinsConditionsFunc,
    };

    // Обновленная функция processStContent
    const processStContent = (content: string, currentIndex: number) => {
        let tracked = {value: "", index: -1, coinIndex: currentIndex};
        let result: React.ReactNode[] = [];
        
        for(let i = 0; i < content.length; i++) {
            const currentChar = content[i];
            
            if(currentChar === "@") tracked.coinIndex = i;
            
            if(currentChar in stSpecialsMap) {
                if(currentChar === tracked.value) {
                    const variableVal = content.substring(tracked.index + 1, i);
                    const func = stSpecialsMap[currentChar];
                    const textVal = func(variableVal, result, { 
                        coinIndex: tracked.coinIndex, 
                        index: i 
                    });
                    if(textVal !== "") result.push(textVal);
                    tracked = {...tracked, value: "", index: i};
                } else {
                    const textVal = content.substring(tracked.index + 1, i);
                    if(tracked.value !== "@" && textVal !== "") {
                        const textValSpecial = textVal.replaceAll("%", `<span class="perCent-special-font">%</span>`);
                        result.push(<span key={result.length} dangerouslySetInnerHTML={{__html: textValSpecial}}/>);
                    }
                    tracked = {...tracked, value: currentChar, index: i};
                }
            }
        }

        const textVal = content.substring(tracked.index + 1);
        if(textVal !== "") {
            const textValSpecial = textVal.replaceAll("%", `<span class="perCent-special-font">%</span>`);
            result.push(<span key={result.length} dangerouslySetInnerHTML={{__html: textValSpecial}}/>);
        }

        return <span className="st-content" key={`st-${currentIndex}`}>{result}</span>;
    };

    const createDescriptionDangerousHTML = (str: React.ReactNode) => {
        if (!str) return null;
    
        const regex = /(#[^#\s]+#)|(&[^&]+&)|(@[^@]+@)|(~[^~]+~)|(<e>(.*?)<\/e>)/g;
        let result: React.ReactNode[] = [];
        let match;
    
        if (typeof str === 'string') {
            let lastIndex = 0;
            while ((match = regex.exec(str)) !== null) {
                if (lastIndex < match.index) {
                    const plainText = str.slice(lastIndex, match.index);
                    const processedText = plainText.replaceAll("%", `<span class="perCent-special-font">%</span>`);
                    result.push(<span key={`plain-${lastIndex}`} dangerouslySetInnerHTML={{ __html: processedText }} />);
                }
                lastIndex = regex.lastIndex;
    
                if (match[0].startsWith('<e>')) {
                    // Обработка содержимого внутри <e> используя функции из отправленного кода
                    const content = match[6];
                    result.push(processStContent(content, result.length));
                } else if (match[1]) {
                    // Обработка #...# вне <e> используя функции из файла
                    const content = match[1];
                    if (content.startsWith('#') && content.endsWith('#') && content.length > 2) {
                        const variableVal = content.slice(1, -1);
                        const textVal = specialsMap['#'](variableVal, { coinIndex: result.length, index: 0 });
                        if (textVal !== null) result.push(textVal);
                    } else {
                        result.push(<span dangerouslySetInnerHTML={{ __html: content }} />);
                    }
                } else if (match[2]) {
                    // Обработка &...& вне <e> используя функции из файла
                    const variableVal = match[2].slice(1, -1);
                    const textVal = specialsMap['&'](variableVal, { idId: variableVal, index: 0 });
                    if (textVal !== null) result.push(textVal);
                } else if (match[3]) {
                    // Обработка @...@ вне <e> используя функции из файла
                    const variableVal = match[3].slice(1, -1);
                    const textVal = specialsMap['@'](variableVal, { giftId: variableVal, index: 0 });
                    if (textVal !== null) result.push(textVal);
                } else if (match[4]) {
                    // Обработка ~...~ вне <e>
                    const variableVal = match[4].slice(1, -1);
                    const textVal = specialsMap['~'](variableVal, { 
                        text: variableVal.split(":")[0], 
                        link: variableVal.split(":")[1] 
                    });
                    if (textVal !== null) result.push(textVal);
                }
            }
    
            if (lastIndex < str.length) {
                const remainingText = str.slice(lastIndex);
                const processedRemainingText = remainingText.replaceAll("%", `<span class="perCent-special-font">%</span>`);
                result.push(<span key={`remaining-${lastIndex}`} dangerouslySetInnerHTML={{ __html: processedRemainingText }} />);
            }
        }
        return result;
    };
    
    return (
        <>
            {createDescriptionDangerousHTML(description)}
        </>
    );
};
