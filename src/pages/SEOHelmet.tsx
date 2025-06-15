import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
interface ISEOHelmet{
    titleText:string,
    descriptionText:string,
}
export const SEOHelmet:React.FC<ISEOHelmet>= ({titleText,descriptionText}) => {
    const {i18n,t} = useTranslation();
  return (
    <Helmet>
    <html lang={i18n.language} />
    <meta name="keywords" content={t("SEOHelmet.keywords")} />
    <meta name="description" content={t("SEOHelmet.description")} />
    <title>{titleText}</title>
    </Helmet>   
  );
};