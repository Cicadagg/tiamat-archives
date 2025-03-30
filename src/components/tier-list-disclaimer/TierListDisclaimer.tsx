import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SkillCoinDescription } from '../entity-full-info/skill-coin-description/SkillCoinDescription';
import { EyeClosedSVG } from '../svg/EyeClosedSVG';
import { EyeOpenedSVG } from '../svg/EyeOpenedSVG';
import './TierListDisclaimer.css';

type TDisclaimerVisibility = "show" | "hide";

export const TierListDisclaimer:React.FC = () => {
    const {t,i18n} = useTranslation();
    const getStoredDisclaimer = () =>{
      const disclaimerVisibility = localStorage.getItem("tier-list-disclaimer-visibility");
      return disclaimerVisibility === "hide" ? "hide" : "show";
    }
    const [disclaimerVisibility, setDisclaimerVisibility] = useState<TDisclaimerVisibility>(getStoredDisclaimer());

    const handleDisclaimerVisibility = () => {
        const newDisclaimerVisibility = disclaimerVisibility === "show" ? "hide" : "show";
        localStorage.setItem("tier-list-disclaimer-visibility",newDisclaimerVisibility);
        setDisclaimerVisibility(newDisclaimerVisibility);
    }
    const descriptions:Record<string,string> = {
        "en":`Only the tier of Identity/EGO matters. Within tiers, the position of Identities/EGO is NOT a ranking of strength.<br/>Identities are rating without considering synergies with EGO, but taking into account the possibility of team building.<br/>Identities/EGO are rated with maximum improvement.<br/><br/>If you disagree with the position of Identity/EGO in the Tier List, then you can go to our <a class="disclaimer-link" href="https://discord.gg/BGpmmqknWE">Discord</a> server.<br/>We reserve the right not to respond to your messages regarding Tier Lists outside of our Discord server.<br/>We ask you to compose more constructive and detailed messages, otherwise, we may misunderstand you.<br/><br/>Calculations of minimum and maximum damage were made with Resistance to Sins and Damage Types equal to x1.<br/>Minimum damage is calculated without conditional effects but with all flipped coins (in the case of negative coins, the opposite) and guaranteed effects.<br/>Maximum damage is calculated with all flipped coins (in the case of negative coins, the opposite) and with all effects from skills and battle passive, except for the <span class="condition--green">[On Kill]</span> conditional effect; also, Identities with the #poise# status always deal Critical Strikes.<br/>For Identities with Res., it is considered equal to the maximum size of the team in the current 'Refraction Railway'.<br/>All statuses dealing damage are taken into account when calculating damage.`,
        "ru":`Важен только тир Идентичности/ЭГО. Внутри тиров положение Идентичностей/ЭГО НЕ является разделением по силе.<br/>Идентичности оцениваются без учёта синергий с ЭГО, но с учётом возможности сборки команд.<br/>Иденичности/ЭГО оцениваются при максимальном улучшении.<br/><br/>Если вы недовольны положением Идентичности/ЭГО в Тирлисте, то можете пройти на наш <a class="disclaimer-link" href="https://discord.gg/BGpmmqknWE">Дискорд</a> сервер.<br/>Мы оставляем за собой право не отвечать на Ваши сообщения по Тирлистам вне нашего Дискорд сервера.<br/>Просим составлять более конструктивные и развёрнутые сообщения, иначе мы можем не верно Вас понять.<br/><br/>Расчеты минимального и максимального урона производились при Сопротивлении Грехам и Типам урона равным х1.<br/>Минимальный урон считается без эффектов с условием, но со всеми выпавшими монетками(для негативных монеток наоборот) и гарантированными эффектами.<br/>Максимальный урон считается со всеми выпавшими монетками(для негативных монеток наоборот) и со всеми эффектами от скилла и боевой пассивки, кроме эффекта с условием <span class="condition--green">[При Убийстве]</span>, также Идентичности со статусом #poise# всегда наносят Критические удары.<br/>У Идентичностей с усилением от Рез. он считается равным максимальному размеру команды в текущей "Железной дороге преломления" (Рельсе).<br/>Все Статусы, наносящие урон, учтены при подсчёте урона.`
    }
  return (
    <div role="contentinfo" aria-label="Disclaimer" aria-labelledby="disclaimer-heading" className="TierListDisclaimer">
        <h2 className="TierListDisclaimer-heading">
            {t("TierListDisclaimer.header")} 
            <button className="filters-show-btn" onClick={handleDisclaimerVisibility}>
                {
                    disclaimerVisibility === "show" ? <EyeOpenedSVG/> : <EyeClosedSVG/>
                }
            </button>

        </h2>
        {
        disclaimerVisibility === "show" && <SkillCoinDescription description={descriptions[i18n.language]||''}/>
        }
    </div>
  );
};