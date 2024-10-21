import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { EGOInterface } from '../../../store/reducers/ego-reducer';
import { setMobileModalTrigger } from '../../../store/reducers/mobile-modal-reducer';
import { StatusesInterface } from '../../../store/reducers/statuses-reducer';
import { getStatusesEntityList } from '../../../tools/getStatusesEntityList';
import { TooltipMobile } from '../../tooltip-mobile/TooltipMobile';
import "./EntityFullInfoEGO.css"
interface IEntityFullInfoProps {
    ego:EGOInterface;
}
const resMap:{
    [key:string]:string
} = {
    'ineff':'[x0.5]',
    'normal':'[x1]',
    'fatal':'[x2]',
    'endure':'[x0.75]',
}
export const EntityFullInfoEGO:React.FC<IEntityFullInfoProps> = ({ego}) => {
    const {sinner,imgUrl,season,egoTier,rarity,descriptionCoinEN,descriptionPassiveEN,wrath,sloth,lust,glut,gloom,pride,envy,egoResists,releaseDate} = ego;
    const {t,i18n} = useTranslation();
    const statuses = useQueryClient().getQueryData('statuses') as StatusesInterface[];
    const rarityStyled = rarity.replaceAll("O","Ø");
    const status = getStatusesEntityList([descriptionCoinEN,descriptionPassiveEN]);
    const sinsList = ["wrath","lust","sloth","glut","gloom","pride","envy"];
    const energyReqList = [wrath,lust,sloth,glut,gloom,pride,envy].filter(s => s > 0);
    const dispatch = useDispatch();
    function excelToDate(excelDate:number) {
        const excelStartDate = new Date(1899, 11, 30);
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const date = new Date(excelStartDate.getTime() + excelDate * millisecondsPerDay);
        return date;
      }
    const formateDate = (date:number) =>{
        const newDate = excelToDate(date);
        const month = `${newDate.getMonth()+1}`;
        const day = `${newDate.getDate()}`;
        return `${day.length === 1 ? `0${day}`: day}.${month.length === 1 ? `0${month}`: month}.${newDate.getFullYear()}`
      }
    return (
        <section className={`${'entityFullInfo-entity'}`} >
                <article className={"entityFullInfo-img"}>
                    <div className="entityFullInfo-rarity" >{rarityStyled}</div>
                    <img className="entityFullInfo-sinner" src={`${process.env.PUBLIC_URL}/images/sinners-icons/${sinner}.webp`} alt={`${sinner}`}/>

                    <div className={"shadow"}>
                        <img src={`${process.env.PUBLIC_URL}/images/ego-profiles/${imgUrl}_profile.webp`} alt={`${imgUrl}`}/>
                    </div>
                    <div className={`entityFullInfo-tier entityFullInfo-tier-${egoTier}`}>
                        {egoTier}
                    </div>
                </article>
                <div className='entityFullInfo-stats-container'>

                    <article className={"entityFullInfo-stats"}>
                        <h2 >{t("EntityFullInfoIdentity.info")}</h2>
                        {
                            season !== "s-b" && <div className={`entityFullInfo-season entityFullInfo-season-${season[0] === 'w' ? 'w' : season.replace(/^e-/, 's-')}`}>
                                {t(`EntityFullInfoIdentity.season.${season}`)}
                            </div>
                        }
                        <div className={"entityFullInfo-release"}>
                            {t('EntityFullInfoIdentity.release')}
                            &nbsp;{/* Add a non-breaking space here */}
                            <span className="date"> {formateDate(releaseDate)} </span>
                        </div>
                    </article>

                {
                    status && <article className={"entityFullInfo-stats"}>
                    <h2 > {t("EntityFullInfoEGO.statuses")}</h2>
                    <ul className='statuses-list'>
                        {
                            Object.keys(status).map( (s,index) =>{
                                const status = statuses.find( st => st.id == s);
                                if(!status) return null;
                                const descriptionKey = `description${i18n.language.toUpperCase()}` as keyof typeof status;
                                const description = status[descriptionKey] as string;

                                const nameKey = `name${i18n.language.toUpperCase()}` as keyof typeof status;
                                const name = status[nameKey] as string;

                                const imgHTML = <img src={`${process.env.PUBLIC_URL}/images/tags/${s}.webp`} alt={`${s}`}/>
                                const mobileStatusHTML = <TooltipMobile text={description} header={name} image={imgHTML}/>
                                return <li onClick={()=> setMobileModalTrigger(dispatch,mobileStatusHTML)} key={index} className='tooltip-container '>
                                      {imgHTML}
                                    <span className='entityFullInfo-tooltip '>
                                        {t("SkillCoinDescription.clickToSeeDescription")}
                                    </span>
                                </li>
                            })
                        }
                    </ul>
                </article>
                }
                <article className={"entityFullInfo-stats"}>
                    <h2>{t("EntityFullInfoEGO.cost")}</h2>
                    <ul className='ego-cost-list'>
                        <li >
                            <img src={`${process.env.PUBLIC_URL}/images/general/sanity.webp`} alt={`sanity`}/>
                            <span>{ego.sanity[0]}
                            {ego.sanity[1] && <>|
                            <span style={{color:"red"}}>{ego.sanity[1]}</span></>}
                            </span>
                        </li>
                        {
                            sinsList.map( (sin,index) =>{
                                if (energyReqList.length >= 6 && index > 2) return null 
                                 const curr = ego[sin as keyof typeof ego];
                                 if(curr === 0) return null;
                                return  <li key={index}>
                                    <img src={`${process.env.PUBLIC_URL}/images/sins/${sinsList[index]}.png`} alt={`${sinsList[index]}`}/>
                                    {curr}
                                </li>
                            })
                        }
                    </ul>
                    {
                         energyReqList.length >= 6 && <ul className='ego-cost-list'>
                         {
                             sinsList.map( (sin,index) =>{
                                 if (energyReqList.length >= 6 && index <= 2) return null ;
                                 const curr = ego[sin as keyof typeof ego];
                                 if(curr === 0) return null;
                                 return  <li key={index}>
                                     <img src={`${process.env.PUBLIC_URL}/images/sins/${sinsList[index]}.png`} alt={`${sinsList[index]}`}/>
                                     {curr}
                                 </li>
                             })
                         }
                     </ul>
                    }
                </article>
                <article className={"entityFullInfo-stats"}>
                    <h2>{t("EntityFullInfoEGO.res")}</h2>
                    {
                        <ul className='ego-resists'>
                        {
                            egoResists.map( (res,index) =>{
                                if(index > 2) return null;
                                return <li key={index}>
                                    <img src={`${process.env.PUBLIC_URL}/images/sins/${sinsList[index]}.png`} alt={`${sinsList[index]}`}/>
                                    {resMap[res.toLowerCase().replace(" ","")]}
                                </li>
                            })
                        }
                        </ul>
                    }
                    {
                        <ul className='ego-resists'>
                        {
                            egoResists.map( (res,index) =>{
                                if(index <= 2) return null;
                                return <li key={index}>
                                    <img src={`${process.env.PUBLIC_URL}/images/sins/${sinsList[index]}.png`} alt={`${sinsList[index]}`}/>
                                    {resMap[res.toLowerCase().replace(" ","")]}
                                </li>
                            })
                        }
                        </ul>
                    }
                </article>
                </div>
                
        </section>
    );
};