import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver"
import { ArrowsRightNavigateSVG } from "../../svg/ArrowsRightNavigate"
import "./NavigationSection.css"

export const NavigationSection: React.FC = () => {
    const { t , i18n} =  useTranslation();
    const quickStartLinks = [
        {
            text:t("NavigationSection.teambuilder"),
            to:`/${i18n.language}/teambuilder`
        },
        {
            text:t("NavigationSection.identities"),
            to:`/${i18n.language}/identities`
        },
        {
            text:t("NavigationSection.ego"),
            to:`/${i18n.language}/ego`
        },
        {
            text:t("NavigationSection.statuses"),
            to:`/${i18n.language}/statuses`
        },
        {
            text:t("NavigationSection.tierlist"),
            to:`/${i18n.language}/tierlist/identities`
        },
    ]
    const NavLink:React.FC<{to:string,text:string}> = ({to,text}) =>{
        const containerRef = useRef(null);
        const {isVisible} = useIntersectionObserver(containerRef,0.1)
        return<li> 
        <Link to={to} ref={containerRef} className={`nav-link ${isVisible && "nav-link--animated"}`}>
            {text}
            <ArrowsRightNavigateSVG />
        </Link>
    </li>
    }
    return <section className="navigation-section">
        <h2> {t("NavigationSection.header")} </h2>
        <ul>
            {quickStartLinks.map((link, index) => {
                return <NavLink key={index} to={link.to} text={link.text}/>
            })}
        </ul>
    </section>
}