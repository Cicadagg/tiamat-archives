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
        "faust" : "Faust",
        "yi sang": "Yi Sang",
        "gregor":"Gregor",
        "mersault":"Mersault",
        "don quixote":"Don Quixote",
        "rodion":"Rodion",
        "ryoshu":"Ryoushu",
        "hong lu":"Hong Lu",
        "heathcliff":"Heathcliff",
        "ishmael":"Ishmael",
        "sinclair":"Sinclair",
        "outis":"Outis",
    }
    return (
        <>
        <SEOHelmet titleText={`${name} | ${sinnersNamesMap[sinner]} | Great Limbus Library`} descriptionText=""/>
        <h1 className="entity-info-header" >{name} <LanguageDisclaimer/></h1>
        <div className={"entityFullInfo"}>
            <EntityFullInfoEGO ego={entity}/>
            <EntityFullInfoSkillsEGO  ego={entity}/>
        </div>
        </>
    );
};