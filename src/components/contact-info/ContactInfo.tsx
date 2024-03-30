import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { H1Component } from "../h1-component/H1Component"
import { LanguageDisclaimer } from "../language-disclaimer/LanguageDisclaimer"
import { DiscordIconSVG } from "../svg/DiscordIcon"
import { ExcelIconSVG } from "../svg/ExcelIcon"
import { ExternalLinkSVG } from "../svg/ExternalLinkSVG"
import { GitHubIconSVG } from "../svg/GitHub"
import "./ContactInfo.css"
export const ContactInfo:React.FC = () =>{
    const {t,i18n} = useTranslation();
    const [tooltip, setTooltip] = useState([{
        id:1,
        link:"ritsy.",
        triggered:false,
    },{
        id:2,
        link:"kamikotosss",
        triggered:false,
    }]);
    const [timer , setTimer] = useState<NodeJS.Timeout|null>(null);
    const copyTextToClipboard = (id:number) =>{
        const textArea = document.createElement('textarea');
        const ds = tooltip.find(t => t.id === id);
        if(!ds) return;
        textArea.value = ds.link;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    useEffect(() => {
        if(timer) clearTimeout(timer);
        const timeout = setTimeout(() => {
            setTooltip(prevTooltip => prevTooltip.map(t => ({ ...t, triggered: false })));
        }, 1000); 
        setTimer(timeout)
        return () => {
            if(timer) clearTimeout(timer);
        }
    }, [tooltip]);
    return <section className="contact-info">
    <div>
    <h1> {t("ContactInfo.header")}  </h1>
    <article>
        <h2 className="color-blue">{t("ContactInfo.originalAuthor")}  </h2>
        <button className="discord" onClick={()=>{
            const targetID = 1;
            copyTextToClipboard(targetID);
            setTooltip(prevTooltip => prevTooltip.map(t => t.id === targetID ? { ...t, triggered: true } : t));
        }}>
            <div className={`contact-tooltip ${tooltip.find(t => t.id === 1)?.triggered && "contact-tooltip--active"}`}>{t("ContactInfo.copied")}  </div>
            <DiscordIconSVG/>
        </button>
        <button>
        <Link to="https://docs.google.com/spreadsheets/d/18pJE1GyNezWQQIvC06iCNtrdV3oTvsSgjYIAwqKBed4/edit?pli=1#gid=0" target="_blank">
            <ExcelIconSVG/>
        </Link>
        </button>
    </article>

    <article className="color-blue">
        <h2>{t("ContactInfo.creator")}  </h2>
        <button className="discord" onClick={()=>{
            const targetID = 2;
            copyTextToClipboard(targetID);
            setTooltip(prevTooltip => prevTooltip.map(t => t.id === targetID ? { ...t, triggered: true } : t));
        }}>
            <div className={`contact-tooltip ${tooltip.find(t => t.id === 2)?.triggered && "contact-tooltip--active"}`} >{t("ContactInfo.copied")}  </div>
            <DiscordIconSVG/>
        </button>
        <button>
        <Link to="https://github.com/Kamikotosss" target="_blank">
            <GitHubIconSVG/>
        </Link>
        </button>
    </article>

    <article style={{
        marginTop:"24px"
    }}>
        <a href={i18n.language === "ru" ? "https://docs.google.com/forms/d/1bRPaej-7flCm1H01xM-OjSXgUs10iej_tiaWNIwOjFI/edit": "https://docs.google.com/forms/d/1Gxsi1emIENdJdDNLd04rD5KytGQRU3UvA-7WHi1DpiY/edit"} className="contacts-questionnaire" target="_blank">
            {t("ContactInfo.questionnaire")} <ExternalLinkSVG/> 
        </a>
    </article>

    </div>
    <article className="contacts-honorable-list">
        <h2>{t("ContactInfo.workers.header")}  </h2>
        <h3 className="color-blue">{t("ContactInfo.workers1.header")}</h3>
        <ul>
            <li>{t("ContactInfo.workers1.1")}</li>
            <li>{t("ContactInfo.workers1.2")}</li>
            <li>{t("ContactInfo.workers1.3")}</li>
            <li>{t("ContactInfo.workers1.4")}</li>
        </ul>
        <h3 className="color-blue">{t("ContactInfo.workers2.header")} </h3>
        <ul>
            <li>{t("ContactInfo.workers2.1")}</li>
            <li>{t("ContactInfo.workers2.2")}</li>
            <li>{t("ContactInfo.workers2.3")}</li>
            <li>{t("ContactInfo.workers2.4")} </li>
            <li> {t("ContactInfo.workers2.5")}</li>
            <li>{t("ContactInfo.workers2.6")}</li>
            <li>{t("ContactInfo.workers2.7")}</li>
            <li>{t("ContactInfo.workers2.9")}</li>
        </ul>
        <h3 className="color-blue">{t("ContactInfo.workers3.header")}</h3>
        <ul>
            {
            i18n.language === "ru" && <li>
                <a href={"https://github.com/Crescent-Corporation/LimbusCompanyBusRUS"} className="contacts-rusLink" target="_blank">
                    {"Русификатор"} <ExternalLinkSVG/> 
                </a>
            </li>
            }
            <li>{t("ContactInfo.workers3.1")}</li>
        </ul>
    </article>
    </section>
}