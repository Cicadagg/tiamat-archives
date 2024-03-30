import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { SEOHelmet } from '../../pages/SEOHelmet';
import { IdentityInterface } from '../../store/reducers/ids-reducer';
import { LanguageDisclaimer } from '../language-disclaimer/LanguageDisclaimer';
import { EntityFullInfoIdentity } from './entity-full-info-identity/EntityFullInfoIdentity';
import { EntityFullInfoSkills } from './entity-full-info-skills/EntityFullInfoSkills';
import "./EntityFullInfo.css"
export const EntityFullInfoIdentityMain = () =>{
    const { identityId } = useParams();
    const {i18n} = useTranslation();
    const entities = useQueryClient().getQueryData('identities') as IdentityInterface[] ;
    const entity = entities.find(id => id.imgUrl === identityId);
  
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
            <EntityFullInfoIdentity  identity={entity}/>
            <EntityFullInfoSkills  identity={entity}/>
        </div>
        </>
    );
};