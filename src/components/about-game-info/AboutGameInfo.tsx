import { useTranslation } from "react-i18next"
import { H1Component } from "../h1-component/H1Component";
import { OfficialLinks } from "../official-links/OfficialLinks"
import "./AboutGameInfo.css"
export const AboutGameInfo:React.FC = () =>{
    const {t} = useTranslation();
    return <section className="about-game-info">
        <H1Component header={t("AboutGameInfo.header")}/>
    <p>
    <span>Limbus Company </span>{t("AboutGameInfo.text.1")}  <span>Project Moon</span>{t("AboutGameInfo.text.2")}
    </p>
    <h2> {t("AboutGameInfo.officialLinks")}</h2>
    <OfficialLinks/>
    </section>
}