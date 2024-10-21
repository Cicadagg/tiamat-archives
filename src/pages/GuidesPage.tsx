import React from "react";
import { useTranslation } from "react-i18next";
import { H1Component } from "../components/h1-component/H1Component";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { SEOHelmet } from "./SEOHelmet";
import { ListGuides } from "../components/list-guides/ListGuides";
import { GuidesFilters } from "../components/filters/GuidesFilters";

export const GuidesPage:React.FC = () => {
    const {t} = useTranslation();
    return <CommonPageLayout>
            <LoadingPageWrapper queryKeys={["guides","statuses"]}>
                <SEOHelmet titleText={t("GuidesPage.title") + " | Great Limbus Library"} descriptionText=""/>
                <H1Component header={t("GuidesPage.header")}/>
                <GuidesFilters />
                <ListGuides />
            </LoadingPageWrapper>
    </CommonPageLayout> 
}
