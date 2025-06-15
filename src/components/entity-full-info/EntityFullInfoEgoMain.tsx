import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { SEOHelmet } from '../../pages/SEOHelmet';
import { EGOInterface } from '../../store/reducers/ego-reducer';
import { LanguageDisclaimer } from '../language-disclaimer/LanguageDisclaimer';
import { EntityFullInfoEGO } from './entity-full-info-ego/EntityFullInfoEGO';
import { EntityFullInfoSkillsEGO } from './entity-full-info-skills-ego/EntityFullInfoSkillsEGO';
import "./EntityFullInfo.css"
export const  EntityFullInfoEGOMain = () =>{
    const {egoId} = useParams();
    const entities =useQueryClient().getQueryData('ego') as EGOInterface[];
    const entity = entities.find(id => id.imgUrl === egoId);
    const {i18n} = useTranslation();
    if(!entity) return null;
    const {sinner} = entity ;

    const nameKey = `name${i18n.language.toUpperCase()}` as keyof typeof entity;
    const name = entity[nameKey] as string;

    const sinnersNamesMap:{[key:string]:string} = {
        "faust" : i18n.language === "ru" ? "Фауст" : "Faust",
        "yi sang": i18n.language === "ru" ? "И Сан" : "Yi Sang",
        "gregor": i18n.language === "ru" ? "Грегор" : "Gregor",
        "mersault": i18n.language === "ru" ? "Мерсо" : "Mersault",
        "don quixote": i18n.language === "ru" ? "Дон Кихот" : "Don Quixote",
        "rodion": i18n.language === "ru" ? "Родя" : "Rodion",
        "ryoshu": i18n.language === "ru" ? "Рёшу" : "Ryoushu",
        "hong lu": i18n.language === "ru" ? "Хон Лу" : "Hong Lu",
        "heathcliff": i18n.language === "ru" ? "Хитклиф" : "Heathcliff",
        "ishmael": i18n.language === "ru" ? "Измаил" : "Ishmael",
        "sinclair": i18n.language === "ru" ? "Синклер" : "Sinclair",
        "outis": i18n.language === "ru" ? "Отис" : "Outis",
    }
    return (
        <>
        <SEOHelmet titleText={`${name} | Great Limbus Library`} descriptionText=""/>
        <h1 className="entity-info-header" >{name} <LanguageDisclaimer/></h1>
        <div className={"entityFullInfo"}>
            <EntityFullInfoEGO ego={entity}/>
            <EntityFullInfoSkillsEGO  ego={entity}/>
        </div>
        </>
    );
};