import React from "react";
import { useTranslation } from "react-i18next";
import { LanguageDisclaimer } from "../language-disclaimer/LanguageDisclaimer";
import { EntitySection } from "./EntitySection/EntitySection";
import { EventsSection } from "./EventsSection/EventsSection";
import "./MainInfo.css";
import { NavigationSection } from "./NavigationSection/NavigationSection";
import { OfficialLinksSection } from "./OfficialLinksSection/OfficialLinksSection";
import { ToDoSection } from "./ToDoSection/ToDoSection";
export const MainInfo:React.FC = () => {
    const {t , i18n} = useTranslation();

    return (
        <section className="main-info" >
            <header className="main-info-header-main">
                    <h1> Great <span>Limbus</span> Library </h1>
                    <p>
                        {t(`MainInfo.headerTitle`)}
                    </p>
                    <p>
                    {t(`MainInfo.headerDescription`)}
                    </p> 
                    <LanguageDisclaimer/>   
            </header>
            <section className="main-info-left">
                <EntitySection/>
                <NavigationSection/>
                <ToDoSection/>
                <OfficialLinksSection/>
            </section>
            <section className="main-info-right">
                    <EventsSection/>
            </section>
               
        </section>
    )
}