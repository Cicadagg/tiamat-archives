import React from "react";
import { useTranslation } from "react-i18next";
import { ContactInfo } from "../components/contact-info/ContactInfo";
import { CommonPageLayout } from "./CommonPageLayout";
import { SEOHelmet } from "./SEOHelmet";

export const ContactPage:React.FC = () => {
    const {t} = useTranslation();
    return <CommonPageLayout >
            <SEOHelmet titleText={t("ContactPage.title") + " | Great Limbus Library"} descriptionText=""/>
            <ContactInfo/>
    </CommonPageLayout>
}
