import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { setMobileModalTrigger } from '../../../store/reducers/mobile-modal-reducer';
import { StatusesInterface } from '../../../store/reducers/statuses-reducer';
import { TooltipMobile } from '../../tooltip-mobile/TooltipMobile';
import "./SkillCoinDescription.css"
interface ISkillCoinDescriptionProps {
    description:string;
}

export const SkillCoinDescription:React.FC<ISkillCoinDescriptionProps> = ({description}) => {
    const statuses = useQueryClient().getQueryData('statuses') as StatusesInterface[];
    const {t,i18n} = useTranslation()
    const dispatch = useDispatch();
   
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
        "[beforeuse]":"[Перед Использованием]",
        "[clashablecounter]":"[Столкновение при Контратаке]",
    }
    const coinsConditionsMap:{
        [key:string]:string;
    } = {
        "fc" : "к Итоговому Значению Cкилла",
        "bc" : "к Базовому Значению Cкилла",
        "cg" : "к Силе Монетки",
        "cp" : "к Силе Столкновения",
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
    const coinFunc = (value:string,result:React.ReactNode[],tracked:{coinIndex:number,index:number}) =>{
        if(isNaN(+value)) return value;
        return <React.Fragment key={result.length}>
        {!!result.length && <br/> }
        <img className="coin" src={`${process.env.PUBLIC_URL}/images/general/coin${value}.png`} alt="coinN"/>
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
    const tagFunc = (value:string,result:React.ReactNode[],tracked:{coinIndex:number,index:number}) =>{
        const status = statuses.find( s => s.id === value);
        if(!status) return value;
        
        const descriptionKey = `description${i18n.language.toUpperCase()}` as keyof typeof status;
        const description = status[descriptionKey] as string;

        const nameKey = `name${i18n.language.toUpperCase()}` as keyof typeof status;
        const name = status[nameKey] as string;

        const imgHTML = <img className="status" src={`${process.env.PUBLIC_URL}/images/tags/${value}.webp`} alt={value} />;
        const mobileModalHTML = <TooltipMobile image={imgHTML} header={name} text={description}/>
        return <React.Fragment key={result.length}>
        {imgHTML}
        <span onClick={()=>{setMobileModalTrigger(
            dispatch,
            mobileModalHTML
        );}} className={`status-name status-name--${value} tooltip-container tooltip--status`}>
            {name}
            <span className="entityFullInfo-tooltip tooltip-container--status">
                {t("SkillCoinDescription.clickToSeeDescription")}
            </span>
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
    const specialsMap = {
        "@":coinFunc,
        "$":conditionFunc,
        "#":tagFunc,
        "&":coinsConditionsFunc,
        "?":weightFunc,
    }
    
    const  createDescriptionDangerousHTML = (str:string) =>{
        if(!str) return "";
        let result:React.ReactNode[] = [];
        let tracked = {value:"",index:-1,coinIndex:0};
        for(let i = 0 ; i < str.length;i++){
            const currentChar = str[i];
            if(currentChar === "@") tracked.coinIndex = i;
            if(currentChar in specialsMap){
                if(currentChar === tracked.value){
                    const variableVal = str.substring(tracked.index + 1, i);
                    const func = specialsMap[currentChar as keyof typeof specialsMap];
                    const textVal = func(variableVal,result,tracked);
                    if(textVal !== "") result.push(textVal);
                    tracked = {...tracked, value:"",index:i};
                }else{
                    const textVal = str.substring(tracked.index + 1, i)
                    if(tracked.value !=="@" && textVal !== ""){
                        const textValSpecial = textVal.replaceAll("%",`<span class="perCent-special-font">%</span>`);
                        result.push(<span key={result.length} dangerouslySetInnerHTML={{__html:textValSpecial}}/>);
                    }
                    tracked = {...tracked, value:currentChar,index:i};
                }
            }
        }
        const textVal = str.substring(tracked.index + 1, str.length);
        if(textVal !== ""){
            const textValSpecial = textVal.replaceAll("%",`<span class="perCent-special-font">%</span>`);
            result.push(<span key={result.length} dangerouslySetInnerHTML={{__html:textValSpecial}}/>);
        }
        return result;
    }
  return (
    <p className={`skill-coin-description`} >
        {createDescriptionDangerousHTML(description)}
    </p>
  );
};
