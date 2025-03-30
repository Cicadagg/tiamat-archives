import React from "react";
import { useTranslation } from "react-i18next";
import { AboutGameInfo } from "../components/about-game-info/AboutGameInfo";
import { CommonPageLayout } from "./CommonPageLayout";
import { SEOHelmet } from "./SEOHelmet";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент

export const AboutGamePage:React.FC = () => {
    const {t} = useTranslation();
    return <CommonPageLayout>
            <Analytics /> {/* Вставляем компонент для GA */}
            <SEOHelmet titleText={t("AboutGamePage.title") + " | Great Limbus Library"} descriptionText=""/>
            <AboutGameInfo/>
    </CommonPageLayout> 
}
