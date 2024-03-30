import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./DisclaimerBanner.css"
export const DisclaimerBanner:React.FC = () => { 
    const [visible ,setVisible] = useState(false);
    const {t} = useTranslation();
    const handleAgreement = () =>{
        localStorage.setItem('gll_disclaimer_agreement', "true");
        setVisible(false);
    }
    useEffect(()=>{
        const agreement = localStorage.getItem('gll_disclaimer_agreement') || "false";
        if(agreement === "false") setVisible(true);
    },[])
    if(!visible) return null;
    return <section className="disclaimer-banner">
        <p>
        <span>Great Limbus Library</span>{t("DisclaimerBanner.1")}<span>Limbus Company</span>.
        <br/>
        {t("DisclaimerBanner.2")} <span>Project Moon</span>{t("DisclaimerBanner.3")}
        </p>
        <button onClick={() => handleAgreement()}>{t("DisclaimerBanner.confirm")}</button>
    </section>
}