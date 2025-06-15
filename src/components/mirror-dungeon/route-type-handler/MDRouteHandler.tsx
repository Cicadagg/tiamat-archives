import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SEOHelmet } from '../../../pages/SEOHelmet';
import { MDEvents } from '../events/MDEvents';
import { MDGifts } from '../gifts/MDGifts';
import { MDRestStops } from '../rest-stops/MDRestStops';

export const MDRouteHandler:React.FC = () => {
    const {t} = useTranslation();
    const params = useParams();
    const type = params['type'] || "redirect";
    switch(type){
        case"events":
            return <>
                <SEOHelmet titleText={t("MirrorDungeonPage.title_events") + " | Great Limbus Library"} descriptionText=""/>
                <MDEvents/>
            </>
        case"rest-stops":
            return <>
                <SEOHelmet titleText={t("MirrorDungeonPage.title_rs") + " | Great Limbus Library"} descriptionText=""/>
                <MDRestStops/>
            </>
        case"gifts":
            return <>
                <SEOHelmet titleText={t("MirrorDungeonPage.title_gifts") + " | Great Limbus Library"} descriptionText=""/>
                <MDGifts/>
            </>
    }
    return  null;
};