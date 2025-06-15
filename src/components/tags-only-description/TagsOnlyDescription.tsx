import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { setMobileModalTrigger } from '../../store/reducers/mobile-modal-reducer';
import { StatusesInterface } from '../../store/reducers/statuses-reducer';
import { TooltipMobile } from '../tooltip-mobile/TooltipMobile';
import './TagsOnlyDescription.css';
type Props = {
    description:string;
}
export const TagsOnlyDescription:React.FC<Props> = ({description}) => {
    const statuses = useQueryClient().getQueryData('statuses') as StatusesInterface[];
    const {t,i18n} = useTranslation()
    const dispatch = useDispatch();
   
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

    const specialsMap = {
        "#":tagFunc,
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