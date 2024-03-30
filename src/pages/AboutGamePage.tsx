import React from "react";
import { useTranslation } from "react-i18next";
import { AboutGameInfo } from "../components/about-game-info/AboutGameInfo";
import { CommonPageLayout } from "./CommonPageLayout";
import { SEOHelmet } from "./SEOHelmet";

export const AboutGamePage:React.FC = () => {
    const {t} = useTranslation();
    return <CommonPageLayout>
            <SEOHelmet titleText={t("AboutGamePage.title") + " | Great Limbus Library"} descriptionText=""/>
            <AboutGameInfo/>
    </CommonPageLayout> 
}
