import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { locales } from '../../constants/locales';
import { setMobileModalTrigger } from '../../store/reducers/mobile-modal-reducer';
import { GoogleTranslateSVG } from '../svg/GoogleTranslate';
import "./LanguageDisclaimer.css"
export const LanguageDisclaimer:React.FC = () => {
    const {i18n ,t} = useTranslation();
    const isDisclaimer = locales.find(l => l.locale === i18n.language)?.isAutoTranslated || false;
    const dispatch = useDispatch();
    const handleMobileClick = () => {
        if(window.innerWidth <= 950) setMobileModalTrigger(
            dispatch,
            <span className='LanguageDisclaimer-tooltip LanguageDisclaimer-tooltip--mobile'>{t("LanguageDisclaimer.tooltip")}</span>
        )
    }
    if(!isDisclaimer) return null;
    
    return (
        <div className='LanguageDisclaimer' onClick={handleMobileClick}>
            <img src={`${process.env.PUBLIC_URL}/images/general/caution.webp`} alt={"translation-caution"}/>
            <GoogleTranslateSVG/>
            <span className='LanguageDisclaimer-tooltip'>{t("LanguageDisclaimer.tooltip")}</span>
        </div>
    );
};