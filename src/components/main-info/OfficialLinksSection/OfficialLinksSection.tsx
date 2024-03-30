import { useTranslation } from "react-i18next"
import { OfficialLinks } from "../../official-links/OfficialLinks"
import "./OfficialLinkSection.css"
export const OfficialLinksSection: React.FC = () => {
    const {t} =  useTranslation();
    return <section className="official-links-section">
        <h2> {t("OfficialLinksSection.header")}</h2>
       <OfficialLinks/>
    </section>
}