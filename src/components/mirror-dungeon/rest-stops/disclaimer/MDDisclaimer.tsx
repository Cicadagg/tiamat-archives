import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SkillCoinDescription } from '../../../entity-full-info/skill-coin-description/SkillCoinDescription';
import { EyeClosedSVG } from '../../../svg/EyeClosedSVG';
import { EyeOpenedSVG } from '../../../svg/EyeOpenedSVG';
import './MDDisclaimer.css';

type TDisclaimerVisibility = "show" | "hide";

export const MirrorDungeonDisclaimer:React.FC = () => {
    const {t,i18n} = useTranslation();
    const getStoredDisclaimer = () =>{
      const disclaimerVisibility = localStorage.getItem("md-disclaimer-visibility");
      return disclaimerVisibility === "hide" ? "hide" : "show";
    }
    const [disclaimerVisibility, setDisclaimerVisibility] = useState<TDisclaimerVisibility>(getStoredDisclaimer());

    const handleDisclaimerVisibility = () => {
        const newDisclaimerVisibility = disclaimerVisibility === "show" ? "hide" : "show";
        localStorage.setItem("md-disclaimer-visibility",newDisclaimerVisibility);
        setDisclaimerVisibility(newDisclaimerVisibility);
    }
    const descriptions:Record<string,string> = {
        "en":`
            The following is the E.G.O Gift Keyword forecast once you've selected the Keyword you want to Fuse into in the "Fusion - Keyword Selection" screen.<br>
            <table style="border-spacing: 0px;">
                <tr>
                    <th style="border: 1px solid white; padding: 10px;">Number of ingredient E.G.O Gifts used for Fusion</th>
                    <th style="border: 1px solid white; padding: 10px;">Rates for an E.G.O Gift with your selected Keyword</th>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">2 Gifts</td>
                    <td style="border: 1px solid white; text-align: center;">60%</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">3 Gifts</td>
                    <td style="border: 1px solid white; text-align: center;">90%</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">4+ Gifts</td>
                    <td style="border: 1px solid white; text-align: center;">99%</td>
                </tr>
            </table>
            * Keywords on the ingredient E.G.O Gifts do not affect the outcome of the Fusion.<br><br>

            Each E.G.O Gift has varying 'Points' for Fusion depending on their Tier.<br>
            <table style="border-spacing: 0px;">
                <tr>
                    <th style="border: 1px solid white; padding: 10px;">E.G.O Gift Tiers</th>
                    <th style="border: 1px solid white; padding: 10px;">Points</th>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">Tier 1</td>
                    <td style="border: 1px solid white; text-align: center;">3</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">Tier 2</td>
                    <td style="border: 1px solid white; text-align: center;">6</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">Tier 3</td>
                    <td style="border: 1px solid white; text-align: center;">10</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">Tier 4</td>
                    <td style="border: 1px solid white; text-align: center;">15</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">Tier 5</td>
                    <td style="border: 1px solid white; text-align: center;">30</td>
                </tr>
            </table>
            <br>
            The Fusion E.G.O Gift Tier is determined by the tally of Points from each ingredient.
            <table style="border-spacing: 0px;">
                <tr>
                    <th style="border: 1px solid white; padding: 10px;">Point Tally</th>
                    <th style="border: 1px solid white; padding: 10px;">Fusion E.G.O Gift Tier</th>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">10- Points</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Tier 1</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">11-16 Points</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Tier 2</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">17-24 Points</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Tier 3</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">25+ Points</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Tier 4</td>
                </tr>
            </table>
            <br>
            * Any E.G.O Gifts currently in your possession cannot be obtained as a Fusion result.<br>
            * E.G.O Gifts consumed as ingredients for a Fusion cannot be obtained from that Fusion. However, E.G.O Gifts that have already been consumed as ingredients in previous Fusions can be obtained as a Fusion result.<br>
            * If you have obtained every possible E.G.O Gift obtainable in that specific Tier + Keyword combination, you will receive an E.G.O Gift of a different Keyword in the same Tier.<br>
            * If you have obtained every possible E.G.O Gift obtainable from the resultant Tier, you will receive a Fusion & Sale Only E.G.O Gift.<br><br>
            Fusing in a Super Shop adds a special modifier to the required tally of th Points from each indigredient.<br>
            <table style="border-spacing: 0px;">
                <tr>
                    <th style="border: 1px solid white; padding: 10px;">Point Tally</th>
                    <th style="border: 1px solid white; padding: 10px;">Fusion E.G.O Gift Tier</th>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">9- Points</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Tier 1</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">10-14 Points</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Tier 2</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">15-21 Points</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Tier 3</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">22+ Points</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Tier 4</td>
                </tr>
            </table>
        `,
        "ru":`
            Далее следует прогноз на Ключевые слова ЭГО Даров при выборе желаемого Ключевого слова, в который Вы желаете соединить ЭГО Дары в окне "Объединение — Выбор Ключевого слова".<br>
            <table style="border-spacing: 0px;">
                <tr>
                    <th style="border: 1px solid white; padding: 10px;">Число объединяемых ЭГО Даров</th>
                    <th style="border: 1px solid white; padding: 10px;">Шанс ЭГО Дара с выбранным Ключевым словом</th>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">2 ЭГО Дара</td>
                    <td style="border: 1px solid white; text-align: center;">60%</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">3 ЭГО Дара</td>
                    <td style="border: 1px solid white; text-align: center;">90%</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">4+ ЭГО Дара</td>
                    <td style="border: 1px solid white; text-align: center;">99%</td>
                </tr>
            </table>
            * Ключевые слова на объединяемых ЭГО Дарах не влияют на Ключевое слово итогового ЭГО Дара.<br><br>

            Каждый ЭГО Дар имеет разное количество "Баллов" для Объединения в зависимости от его Ранга.<br>
            <table style="border-spacing: 0px;">
                <tr>
                    <th style="border: 1px solid white; padding: 10px;">Ранги ЭГО Даров</th>
                    <th style="border: 1px solid white; padding: 10px;">Баллы</th>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">Ранг 1</td>
                    <td style="border: 1px solid white; text-align: center;">3</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">Ранг 2</td>
                    <td style="border: 1px solid white; text-align: center;">6</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">Ранг 3</td>
                    <td style="border: 1px solid white; text-align: center;">10</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">Ранг 4</td>
                    <td style="border: 1px solid white; text-align: center;">15</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center;">Ранг 5</td>
                    <td style="border: 1px solid white; text-align: center;">30</td>
                </tr>
            </table>
            <br>
            Ранг Объединяемого ЭГО Дара определяется подсчетом Баллов от каждого объединяемого ЭГО Дара.<br>
            <table style="border-spacing: 0px;">
                <tr>
                    <th style="border: 1px solid white; padding: 10px;">Сумма Баллов</th>
                    <th style="border: 1px solid white; padding: 10px;">Ранг Объединяемого ЭГО Дара</th>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Менее 10 Баллов</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Ранг 1</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">11-16 Баллов</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Ранг 2</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">17-24 Баллов</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Ранг 3</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Более 25 Баллов</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Ранг 4</td>
                </tr>
            </table>
            <br>
            * Любые ЭГО Дары, которые в данный момент находятся в вашем распоряжении, не могут быть получены в результате Объединения.<br>
            * ЭГО Дары, использованные для Объединения, не могут быть получены из этого Объединения. Однако, ЭГО Дары, уже использованные в предыдущих Объединениях, могут быть получены в результате Объединения.<br>
            * Если вы получили все возможные ЭГО Дары, которые можно получить в этой конкретной комбинации Ранга + Ключевого слова, вы получите ЭГО Дар с другим Ключевым словом в том же Ранге.<br>
            * Если вы получили все возможные ЭГО Дары, которые можно получить в этом Ранге, вы получите "ЭГО Дар только для Объединения и Продажи".<br><br>
            Объединение в Супермагазине добавляет специальный модификатор к требуемой Сумме Баллов от каждого объединяемого ЭГО Дара.<br>
            <table style="border-spacing: 0px;">
                <tr>
                    <th style="border: 1px solid white; padding: 10px;">Сумма Баллов</th>
                    <th style="border: 1px solid white; padding: 10px;">Ранг Объединяемого ЭГО Дара</th>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Менее 9 Баллов</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Ранг 1</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">10-14 Баллов</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Ранг 2</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">15-21 Баллов</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Ранг 3</td>
                </tr>
                <tr>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Более 22 Баллов</td>
                    <td style="border: 1px solid white; text-align: center; padding: 10px;">Ранг 4</td>
                </tr>
            </table>
        `
    }
  return (
    <div role="contentinfo" aria-label="Disclaimer" aria-labelledby="disclaimer-heading" className="TierListDisclaimer">
        <h2 className="TierListDisclaimer-heading">
            {t("RestRoomDisclaimer.header")} 
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