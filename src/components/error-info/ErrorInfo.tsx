import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; 
import "./ErrorInfo.css"
export const ErrorInfo:React.FC<{error:string}> = ({ error }) => {
  const {t,i18n} = useTranslation();
  return (
    <div className="error-info">
      <h2>{t("ErrorInfo.header")}</h2>
      <p>{error}</p>;
      <Link to={`/${i18n.language}/`}>{t("ErrorInfo.toMain")}</Link>
    </div>
  );
};

