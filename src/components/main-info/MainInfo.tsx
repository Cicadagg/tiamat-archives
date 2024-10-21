import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { LanguageDisclaimer } from "../language-disclaimer/LanguageDisclaimer";
import { EntitySection } from "./EntitySection/EntitySection";
import { EventsSection } from "./EventsSection/EventsSection";
import { NewsSection } from "./NewsSection/NewsSection";
import { Link } from "react-router-dom"
import "./MainInfo.css";
import { NavigationSection } from "./NavigationSection/NavigationSection";
import { OfficialLinksSection } from "./OfficialLinksSection/OfficialLinksSection";
import { ToDoSection } from "./ToDoSection/ToDoSection";
export const MainInfo:React.FC = () => {
    const {t , i18n} = useTranslation();

    const quickStartLinks = [
        {
            text:t("MainInfo.headerDescription3"),
            to:`/${i18n.language}/graditude`
        }
    ]
    const NavLink:React.FC<{to:string,text:string}> = ({to,text}) =>{
        const containerRef = useRef(null);
        return<span className="text-support-site">
        <Link to={to} ref={containerRef} className={"support-link"}>
            {text}
        </Link>
    </span>
    }
    return (
        <section className="main-info" >
            <header className="main-info-header-main">
                    <h1> Great <span>Limbus</span> Library </h1>
                    <p className="main-info-header-description">
                        {t(`MainInfo.headerDescription1`)}<br/>
                        {t(`MainInfo.headerDescription2`)}
                        {quickStartLinks.map((link, index) => {
                            return <NavLink key={index} to={link.to} text={link.text}/>
                        })}
                        {t(`MainInfo.headerDescription4`)}
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
                    <NewsSection/>
                    <EventsSection/>
            </section>
               
        </section>
    )
}