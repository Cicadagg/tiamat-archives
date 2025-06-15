import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EmailIconSVG } from "../svg/EmailIconSVG"; // Импорт EmailIconSVG
import { ExternalLinkSVG } from "../svg/ExternalLinkSVG";
import "./ContactInfo.css";

export const ContactInfo: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [tooltip, setTooltip] = useState([
    {
      id: 1,
      link: "ritsy.",
      triggered: false,
    },
    {
      id: 2,
      link: "ritsy.",
      triggered: false,
    },
  ]);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [copySuccess, setCopySuccess] = useState(false); // Состояние для отображения всплывающего сообщения

  useEffect(() => {
    if (timer) clearTimeout(timer);
    const timeout = setTimeout(() => {
      setTooltip((prevTooltip) =>
        prevTooltip.map((t) => ({ ...t, triggered: false }))
      );
    }, 1000);
    setTimer(timeout);
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [tooltip]);

  const copyEmailToClipboard = () => {
    navigator.clipboard
      .writeText("gll-fun@mail.ru")
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000); // Скрыть сообщение через 2 секунды
      })
      .catch((err) => {
        console.error("Failed to copy email: ", err);
      });
  };

  return (
    <section className="contact-info">
      <div>
        <h1>{t("ContactInfo.header")}</h1>
        <article>
          <div>
            <button onClick={copyEmailToClipboard}>
              <EmailIconSVG />
            </button>
            {copySuccess && (
              <div className="copy-success-message">
                {t("ContactInfo.emailCopied")} {/* "Почта скопирована!" */}
              </div>
            )}
          </div>
        </article>
        {i18n.language === "ru" && (
          <h1>{t("ContactInfo.colleagues.header")}</h1>
        )}
        {i18n.language === "ru" && (
          <article className="colleagues-contacts-honorable-list">
            <div className="site-workers">
              <ul>
                <li>{t("ContactInfo.colleagues.1")}</li>
                <ul>
                  <li>
                    <a
                      href={
                        "https://github.com/Crescent-Corporation/LimbusCompanyBusRUS"
                      }
                      className="contacts-rusLink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {"GitHub"} <ExternalLinkSVG />
                    </a>
                  </li>
                  <li>
                    <a
                      href={"https://vk.com/limbus_company_ru"}
                      className="contacts-rusLink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {"ВКонтакте"} <ExternalLinkSVG />
                    </a>
                  </li>
                  <li>
                    <a
                      href={"https://discord.com/invite/PG7PDrdjey"}
                      className="contacts-rusLink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {"Дискорд"} <ExternalLinkSVG />
                    </a>
                  </li>
                </ul>
                <li>{t("ContactInfo.colleagues.2")}</li>
                <ul>
                  <li>
                    <a
                      href={"https://vk.com/projmoon"}
                      className="contacts-rusLink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {"ВКонтакте"} <ExternalLinkSVG />
                    </a>
                  </li>
                </ul>
                <li>{t("ContactInfo.colleagues.3")}</li>
                <ul>
                  <li>
                    <a
                      href={"https://t.me/limbuscomp"}
                      className="contacts-rusLink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {"Telegram"} <ExternalLinkSVG />
                    </a>
                  </li>
                </ul>
              </ul>
            </div>
          </article>
        )}
      </div>
      <article className="contacts-honorable-list">
        <div className="site-workers">
            <h2>{t("ContactInfo.workers.header")}</h2>
            <h3 className="color-blue">{t("ContactInfo.workers1.header")}</h3>
            <ul>
                <li>{t("ContactInfo.workers1.1")}</li>
            </ul>
            <h3 className="color-blue">{t("ContactInfo.workers2.header")}</h3>
            <ul className="librarian-patron">
                <li>{t("ContactInfo.workers2.patron1")}
                    <ul className="text-librarian-patron">
                        <li>{t("ContactInfo.workers2.1")}</li>
                    </ul>
                </li>
                {/* <li>{t("ContactInfo.workers2.patron2")}
                <ul className="text-librarian-patron">
                        <li>{t("ContactInfo.workers2.2")}</li>
                    </ul>
                </li> */}
                <li>{t("ContactInfo.workers2.patron3")}
                    <ul className="text-librarian-patron">
                        <li>{t("ContactInfo.workers2.3")}</li>
                        <li>{t("ContactInfo.workers2.12")}</li>
                    </ul>
                </li>
                {/* <li>{t("ContactInfo.workers2.patron4")}
                    <ul className="text-librarian-patron">
                        <li>{t("ContactInfo.workers2.4")}</li>
                    </ul>
                </li> */}
                <li>{t("ContactInfo.workers2.patron5")}
                    <ul className="text-librarian-patron">
                        <li>{t("ContactInfo.workers2.5")}</li>
                    </ul>
                </li>
                <li>{t("ContactInfo.workers2.patron6")}
                    <ul className="text-librarian-patron">
                        <li>{t("ContactInfo.workers2.6")}</li>
                    </ul>
                </li>
                <li>{t("ContactInfo.workers2.patron7")}
                    <ul className="text-librarian-patron">
                        <li>{t("ContactInfo.workers2.7")}</li>
                    </ul>
                </li>
                <li>{t("ContactInfo.workers2.patron8")}
                    <ul className="text-librarian-patron">
                        <li>{t("ContactInfo.workers2.8")}</li>
                    </ul>
                </li>
                <li>{t("ContactInfo.workers2.patron9")}
                    <ul className="text-librarian-patron">
                        <li>{t("ContactInfo.workers2.11")}</li>
                    </ul>
                </li>
                <li>{t("ContactInfo.workers2.patron10")}
                    <ul className="text-librarian-patron">
                        <li>{t("ContactInfo.workers2.10.1")}</li>
                        <li>{t("ContactInfo.workers2.10.2")}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div className="lost-book-and-sp">
          <h3 className="color-blue">{t("ContactInfo.workers3.header")}</h3>
          <ul>
            <li>{t("ContactInfo.workers3.1")}</li>
            <li>{t("ContactInfo.workers3.2")}</li>
            <li>{t("ContactInfo.workers3.3")}</li>
            <li>{t("ContactInfo.workers3.4")}</li>
            <li>{t("ContactInfo.workers3.5")}</li>
            <li>{t("ContactInfo.workers3.6")}</li>
            <li>{t("ContactInfo.workers3.7")}</li>
          </ul>
          <h3 className="color-blue">{t("ContactInfo.workers4.header")}</h3>
          <ul>
            <li>{t("ContactInfo.workers4.1")}</li>
            <ul>
              <li>
                <a
                  href={"https://www.youtube.com/@CHACHENWAGENTV"}
                  className="contacts-rusLink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"YouTube"} <ExternalLinkSVG />
                </a>
              </li>
              <li>
                <a
                  href={"https://www.twitch.tv/devochkavolshebnicayufule"}
                  className="contacts-rusLink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"Twitch"} <ExternalLinkSVG />
                </a>
              </li>
              <li>
                <a
                  href={"https://t.me/chachenwagentv"}
                  className="contacts-rusLink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {"Telegram"} <ExternalLinkSVG />
                </a>
              </li>
            </ul>
          </ul>
        </div>
      </article>
    </section>
  );
};
