import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sinTypes } from '../../../../constants/skillBasedTypes';
import { ChvronUpSVG } from '../../../svg/chevron-up';
import { TextPercentComponent } from '../../../text-percent-component/TextPercentComponent';
import { MDFormatedText } from '../../formated-text-gift/MDFormatedText';
import './MDEventOption.css';
type CheckConfig = {
    "function":">"|"<"|">="|"="|"<=",
    "value":number
}
type Check =  {
    "*"?:CheckConfig
    "wrath"?:CheckConfig
    "lust"?:CheckConfig
    "sloth"?:CheckConfig
    "glut"?:CheckConfig
    "gloom"?:CheckConfig
    "pride"?:CheckConfig
    "envy"?:CheckConfig
}
export type ChekOption = {
  "result":string
  "combat_encounter"?:CombatEvent
  options?:Record<string,Option>
  "check"?:Check,
  "check_passed"?:ChekOption
  "check_failed"?:ChekOption
}
type CombatEvent = {
  "text"?:string,
  "enemies":{
    "img_id":string,
    "name":string,
    "count":number
  }[]
  "result":string
}
export type Option = {
    gift_id?:string|string[],
    "description"?:string,
    "result"?:string,
    "check"?:Check,
    "check_passed"?:ChekOption
    "check_failed"?:ChekOption
    "combat_encounter"?:CombatEvent
    options?:Record<string,Option>
}
const functionSignMapper = (sign:string) =>{
      if(sign ==="<=") return "≤";
      else if(sign ===">=") return "≥";
      else return sign;
}
function findKeysWithSameConfig(checks: Check): string[][] {
  const configMap: Record<string, string[]> = {};
  for (const key in checks) {
      if (checks.hasOwnProperty(key)) {
          const configStr = JSON.stringify(checks[key as keyof typeof checks]);
          if (!configMap[configStr]) {
              configMap[configStr] = [key];
          } else {
              configMap[configStr].push(key);
          }
      }
  }

  const keysWithSameConfig: string[][] = [];
  for (const configStr in configMap) {
      if (configMap.hasOwnProperty(configStr) && configMap[configStr].length > 0) {
          keysWithSameConfig.push(configMap[configStr]);
      }
  }

  return keysWithSameConfig;
}

const MDEventOptionResult:React.FC<{text?:string,classes?:string}> = ({text,classes}) =>{
  if(!text) return null;
  return <div className={`option-result option-result-wrapper option-result--${classes}`}>
    {text.split("<br>").map((txt,index)=>{
      return <TextPercentComponent key={index} text={txt} Mapper={MDFormatedText}/>
    })}
  </div>
}
const MDEventCheckPassed:React.FC<{check_passed?:ChekOption}> = ({check_passed}) =>{
  const {t} = useTranslation();
  if(!check_passed) return null;
  return (
    <>
    <div className="check-passed-header">
      <img src={`${process.env.PUBLIC_URL}/images/general/coinBefore.webp`} alt={"check passed"}/>
      {t("MDEventOption.check_passed")}
    </div>
    {
      !!check_passed.check && <div style={{width:'90%',display:'flex',flexDirection:"column",gap:"12px"}}>
          <MDEventOptionCheck check={check_passed.check}/>
    </div>
    }

    <MDEventOptionResult text={check_passed.result}/>
    <MDEventOptionCombat combat={check_passed.combat_encounter}/>
    {check_passed.options && Object.entries(check_passed.options).map(([opinionKey, optionData]) => (
    <div style={{width:'90%'}}>
        <MDEventOption key={opinionKey} option={optionData}  optionName={opinionKey}/>
    </div>
    ))
    }
    {
      !!check_passed.check_passed && <div style={{width:'90%',display:'flex',flexDirection:"column",gap:"12px"}}>
      <MDEventCheckPassed check_passed={check_passed.check_passed}/>
    </div>
    }

    {
      !!check_passed.check_failed && <div style={{width:'90%',display:'flex',flexDirection:"column",gap:"12px"}}>
      <MDEventCheckFailed check_failed={check_passed.check_failed}/>
    </div>
    }
    </>
  )
}
const MDEventCheckFailed:React.FC<{check_failed?:ChekOption}> = ({check_failed}) =>{
  const {t} = useTranslation();

  if(!check_failed) return null;
  return (
    <>
    <div className="check-failed-header">
      <img src={`${process.env.PUBLIC_URL}/images/general/coin.webp`} alt={"check failed"}/>
      {t("MDEventOption.check_failed")}
    </div>
    {
      !!check_failed.check && <div style={{width:'90%',display:'flex',flexDirection:"column",gap:"12px"}}>
      <MDEventOptionCheck check={check_failed.check}/>
    </div>
    }

    <MDEventOptionResult text={check_failed.result}/>
    <MDEventOptionCombat combat={check_failed.combat_encounter}/>
    {
    check_failed.options && Object.entries(check_failed.options).map(([opinionKey, optionData]) => (
    <div style={{width:'90%',display:'flex',flexDirection:"column",gap:"12px"}}>
        <MDEventOption key={opinionKey} option={optionData}  optionName={opinionKey}/>
    </div>
    ))
    }

    {
      !!check_failed.check_passed && <div style={{width:'90%',display:'flex',flexDirection:"column",gap:"12px"}}>
      <MDEventCheckPassed check_passed={check_failed.check_passed}/>
    </div>
    }

    {
      !!check_failed.check_failed && <div style={{width:'90%',display:'flex',flexDirection:"column",gap:"12px"}}>
      <MDEventCheckFailed check_failed={check_failed.check_failed}/>
    </div>
    }
    
  
    </>
  )
}

const MDEventOptionCombat:React.FC<{combat?:CombatEvent}> = ({combat}) =>{
  const {t} = useTranslation();
  if(!combat) return null;
  const {enemies,result} = combat;
  return <div className={`option-combat-wrapper`}>
    {
      combat.text && <MDEventOptionResult text={combat.text} classes="combat"/>
    }
    <div className="option-combat-header">{t("MDEventOption.combat_header")}</div>
    <div className="option-combat-items">
      {
        enemies.map((e,id)=>{
          const {count,img_id,name} =e;
          return <React.Fragment key={id}>
            {
              Array(count).fill(1).map((_,inx)=>{
                return <figure>
                  <img 
                  src={`${process.env.PUBLIC_URL}/images/enemies/${img_id}.webp`}
                  alt={`enemy ${name}`}/>
                  <figcaption>
                    {name}
                  </figcaption>
                </figure>
              })
            }
          </React.Fragment>
        })
      }
    </div>
    <MDEventOptionResult text={result} classes="combat"/>

  </div>;
}
export const MDEventOptionCheck:React.FC<{check?:Check}> = ({check})=> {
  const {t} = useTranslation();

  if(!check) return null;
  const keysWhitelist = sinTypes as string[];
  const filteredCheck:Record<string,unknown> = {...check};
  Object.keys(filteredCheck).forEach(key=>{
    if(!keysWhitelist.includes(key.toLowerCase())){
      delete filteredCheck[key]
    }
  })
  const checkArrays = findKeysWithSameConfig(filteredCheck);
  return <div className="check-info">
  <div className="check-check">{t("MDEventOption.check")}</div>
  {
    checkArrays.map((item,id)=>{
      const key = item[0];
      if(!key) return null;
      const checkData = check[key as keyof typeof  check];
      if(typeof checkData !== "object") return null;
      return <div className="check-item-container" key={id}>
        {
          item.map((key,id)=>{
            const checkData = check[key as keyof typeof  check];
            if(typeof checkData !== "object") return null;
            return <div key={id} className="check-item">
              <img src={`${process.env.PUBLIC_URL}/images/sins/${key}.webp`} alt={key}/>
              <span>{t(`FiltersSection.${key}`)}</span>
              {(item.length !== id +1) &&  <span>/</span>}
            </div>
          })
        }
         <span>{t("MDEventOption.advantage")}</span>
         <img src={`${process.env.PUBLIC_URL}/images/general/coinBefore.webp`} alt={key}/>
          <span>{functionSignMapper(checkData.function)}</span>
          <span>{checkData.value}</span>
      </div>
    })
  }
  {Object.entries(check).map(([checkName, checkData]) => {
    if(keysWhitelist.includes(checkName)) return null;
    return <div key={checkName} className="check-item">
      {
          (checkName === "*" || !keysWhitelist.includes(checkName.toLowerCase())) 
          ?<></>
          :<img src={`${process.env.PUBLIC_URL}/images/sins/${checkName}.webp`} alt={checkName}/>
      }
      {
        typeof checkData === "object"
        ?
        <>
          {
            (checkName === "*")  
            ?<span>{t("MDEventOption.no_advantage")}</span>
            :<span>{checkName}</span>
          }
          <img src={`${process.env.PUBLIC_URL}/images/general/coinBefore.webp`} alt={checkName}/>
          <span>{functionSignMapper(checkData.function)}</span>
          <span>{checkData.value}</span>
        </>
        :<>
          <TextPercentComponent text={checkName + checkData}/>
        </>
      } 
  </div>
  })}
</div>
}
export const MDEventOption:React.FC<{option:Option,optionName?:string}> = ({option,optionName}) => {
    const [isExpanded, setIsExpanded] = useState((optionName) ? false : true);

    const toggleExpand = () => {
    if(!optionName) return;
      setIsExpanded(!isExpanded);
    };
    return (
    <div className={`md-event-option `}>
        {
            !!optionName &&
            <div className={`option-name ${isExpanded ? 'expanded' : 'collapsed'}`} onClick={toggleExpand}>
                <ChvronUpSVG/>
                <div style={{display:"flex",flexDirection:"column"}}>
                {optionName}
                {
                  !!option.description && <span className='option-description'>
                    <TextPercentComponent text={option.description}/>
                  </span>
                }
                </div>
            </div>
        }
        
        
      {isExpanded && (
        <>
          <MDEventOptionCheck check={option.check}/>

          <MDEventOptionResult text={option.result}/>
          <MDEventOptionCombat combat={option.combat_encounter}/>
          <MDEventCheckPassed check_passed={option.check_passed}/>
          <MDEventCheckFailed check_failed={option.check_failed}/>
       
          {option.options && Object.entries(option.options).map(([opinionKey, optionData]) => (
            <div style={{width:(optionName) ?'90%' :'100%'}}>
                <MDEventOption key={opinionKey} option={optionData}  optionName={opinionKey}/>
            </div>
          ))}
        </>
      )}
    </div>
      );
};