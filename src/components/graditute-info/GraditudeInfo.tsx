import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next";
import { BoostySVG } from '../svg/BoostySVG';
import { CloudTipSVG } from '../svg/CloudTipSVG';
import { TinkoffSVG } from '../svg/TinkoffSVG';
import "./GraditudeInfo.css";

export const GraditudeInfo: React.FC = () => { 
    const {t,i18n} = useTranslation(); 
    const [tooltip, setTooltip] = useState([{
        id:1,
        link:"2200701052639736",
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

    return (
        <section className="graditude-info">
            <div className="content-container">
                <div className="text-donation">
                    <h1>{t("GraditudeInfo.text-donation.header")}</h1>
                    {
                        (i18n.language === "ru") 
                        ? 
                            <p>
                                {t("GraditudeInfo.text-donation.text1")}
                                <br/><br/>{t("GraditudeInfo.text-donation.text2")}
                                <br/>{t("GraditudeInfo.text-donation.text3")}
                                <br/>{t("GraditudeInfo.text-donation.text4")}
                                <br/>{t("GraditudeInfo.text-donation.text5")}
                                <br/>{t("GraditudeInfo.text-donation.text6")}
                                <br/><br/>{t("GraditudeInfo.text-donation.text7")}
                            </p> 
                        : 
                            <p>
                                {t("GraditudeInfo.text-donation.text1")}
                                <br/><br/>{t("GraditudeInfo.text-donation.text2")}
                                <br/><br/>{t("GraditudeInfo.text-donation.text3")}
                                
                            </p> 
                    }
                    <h1>{t("GraditudeInfo.text-donation.links.header")}</h1>
                    <div className="donation-link">
                        <div className="tinkoff-button">
                            {
                            i18n.language === "ru" && <button onClick={()=>{
                                const targetID = 1;
                                copyTextToClipboard(targetID);
                                setTooltip(prevTooltip => prevTooltip.map(t => t.id === targetID ? { ...t, triggered: true } : t));
                            }}>
                                <div className={`contact-tooltip ${tooltip.find(t => t.id === 1)?.triggered && "contact-tooltip--active"}`}>{t("GraditudeInfo.copied")}  </div>
                                <TinkoffSVG/>
                            </button>
                            }
                        </div>
                        <div className="cloudtips-button">
                            {
                            i18n.language === "ru" && <button> 
                                <a href="https://pay.cloudtips.ru/p/4a2355b1" target="_blank">
                                    <CloudTipSVG />
                                </a>
                            </button>
                            }
                        </div>
                        <div className="boosty-button">
                            <button>
                                <a href="https://boosty.to/gll-fun" target="_blank">
                                    <BoostySVG />
                                </a>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="donator-list">
                    <h1>{t("GraditudeInfo.donator.header")}</h1>
                    <article className="graditude-honorable-list">
                        <h3 className="color-blue">{t("GraditudeInfo.patrons1.header")}</h3>
                        <ul>
                            <li>{"Балтика"}</li>
                            <li>{"Zurra"}</li>
                            <li>{"Аноним"}</li>
                            <li>{"рыбочурка"}</li>
                            <li>{"Namishun"}</li>
                            <li>{"Slizar"}</li>
                            <li>{"Санянами_Реечка(REI Corp.)"}</li>
                            <li>{"AlastarZ"}</li>
                            <li>{"kleesupremacy"}</li>
                        </ul>
                    </article>
                    <article className="graditude-honorable-list">
                        <h3 className="color-blue">{t("GraditudeInfo.patrons2.header")}</h3>
                        <ul>
                            <li>{"Zurra"}</li>
                            <li>{"Mak8m"}</li>
                            <li>{"lasosaynas"}</li>
                            <li>{"Саша Куценко"}</li>
                            <li>{"Xoskar"}</li>
                            <li>{"Codey"}</li>
                            <li>{"PancakeHunter"}</li>
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    ); 
};