import React from "react";
import { useTranslation } from "react-i18next";
import { TurnamentInfo } from "../components/turnament/TurnamentInfo";
import { CommonPageLayout } from "./CommonPageLayout";
import { SEOHelmet } from "./SEOHelmet";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент

export const TurnamentPage:React.FC = () => {
    const {t} = useTranslation();
    return <CommonPageLayout>
            <Analytics /> {/* Вставляем компонент для GA */}
             <LoadingPageWrapper queryKeys={["bingo"]}><TurnamentInfo/></LoadingPageWrapper>
            <SEOHelmet titleText={t("TurnamentPage.title") + " | Great Limbus Library"} descriptionText=""/>
    </CommonPageLayout> 
}
