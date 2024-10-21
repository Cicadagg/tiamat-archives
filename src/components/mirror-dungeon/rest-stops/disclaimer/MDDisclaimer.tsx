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
    const googleSheetLink = i18n.language === "ru " ? "https://forms.gle/FFMsF6XCYVosruXV7" : "https://forms.gle/ZGQwBZkJUh3nNcLo8";
    const descriptions:Record<string,string> = {
        "en":`
        The following is the EGO Gift Keyword forecast once you've selected the Keyword you want to Fuse into in the "Fusion - Keyword Selection" screen.<br>
        <table style="border-spacing: 0px;">
            <tr>
                <th style="border: 1px solid white; padding: 10px;">Number of ingredient EGO Gifts used for Fusion</th>
                <th style="border: 1px solid white; padding: 10px;">Rates for an EGO Gift with your selected Keyword</th>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">2 Gifts</td>
                <td style="border: 1px solid white; text-align: center;">60%</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">3 Gifts</td>
                <td style="border: 1px solid white; text-align: center;">90%</td>
            </tr>
        </table>
        * Keywords on the ingredient EGO Gifts do not affect the outcome of the Fusion.<br><br>

        The following are the EGO Gift Tier forecasts when fusing 2 EGO Gifts. Please note that you can receive up to Tier 3 EGO Gifts when fusing 2 EGO Gifts together.<br>
        <table style="border-spacing: 0px;">
            <tr>
                <th style="border: 1px solid white; padding: 10px;">Ingredient EGO Gift Tiers</th>
                <th style="border: 1px solid white; padding: 10px;">EGO Gift Tier Forecast</th>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 1 + Tier 1</td>
                <td style="border: 1px solid white; text-align: center;">Tier 1</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 1 + Tier 2</td>
                <td style="border: 1px solid white; text-align: center;">Tier 1</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 1 + Tier 3</td>
                <td style="border: 1px solid white; text-align: center;">Tier 2</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 2 + Tier 2</td>
                <td style="border: 1px solid white; text-align: center;">Tier 2</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 2 + Tier 3</td>
                <td style="border: 1px solid white; text-align: center;">Tier 2</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 3 + Tier 3</td>
                <td style="border: 1px solid white; text-align: center;">Tier 3</td>
            </tr>
        </table>
        <br>
        The following are the EGO Gift Tier forecasts when fusing 3 EGO Gifts. Please note that you can receive up to Tier 4 EGO Gifts when fusing 3 EGO Gifts together.
        <table style="border-spacing: 0px;">
            <tr>
                <th style="border: 1px solid white; padding: 10px;">Combining Gifts with different Keywords</th>
                <th style="border: 1px solid white; padding: 10px;">EGO Gift Tier Forecast</th>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 1 + Tier 1 + Tier 1</td>
                <td style="border: 1px solid white; text-align: center;">Tier 1</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 1 + Tier 1 + Tier 2</td>
                <td style="border: 1px solid white; text-align: center;">Tier 2</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 1 + Tier 1 + Tier 3</td>
                <td style="border: 1px solid white; text-align: center;">Tier 2</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 1 + Tier 2 + Tier 2</td>
                <td style="border: 1px solid white; text-align: center;">Tier 2</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 1 + Tier 2 + Tier 3</td>
                <td style="border: 1px solid white; text-align: center;">Tier 3</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 1 + Tier 3 + Tier 3</td>
                <td style="border: 1px solid white; text-align: center;">Tier 3</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 2 + Tier 2 + Tier 2</td>
                <td style="border: 1px solid white; text-align: center;">Tier 3</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 2 + Tier 2 + Tier 3</td>
                <td style="border: 1px solid white; text-align: center;">Tier 3</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 2 + Tier 3 + Tier 3</td>
                <td style="border: 1px solid white; text-align: center;">Tier 4</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Tier 3 + Tier 3 + Tier 3</td>
                <td style="border: 1px solid white; text-align: center;">Tier 4</td>
            </tr>
        </table>
        <br>
        However, if you have already acquired every single EGO Gift in the above Keyword and Tier combination, or if those EGO Gifts have already been assigned to Mirror Dungeon Events or the Boss Rewards of this Floor, then you might acquire an EGO Gift of a different Tier or a Keyword category from the chart listed above.<br>
        If you have already acquired all EGO Gifts in the corresponding Tier or are unable to obtain them due to the aforementioned reasons, then you cannot proceed with the Fusion.<br>
        <br>
        The following are the circumstances in which the resulting EGO Gift from the Fusion won't match the Fusion Forecasts. In such cases, Keyword Forecast will be marked as "(Random)".<br>
        1) When every available EGO Gift in the selected Keyword category and forecasted Tier has already been obtained<br>
        2) When EGO Gifts of the selected Keyword category and the forecasted Tier have all been assigned to that Floor's Mirror Dungeon Events or Boss Encounter Reward pool (Can be obtained in the next Floor)<br>
        * You cannot continue with the Fusion if you have collected every EGO Gift in the forecasted Tier.
        `,
        "ru":`
        Далее следует прогноз на Ключевые слова ЭГО Даров при выборе желаемого Ключевого слова, в который Вы желаете соединить ЭГО Дары в окне "Соединение — Выбор Ключевого слова".<br>
        <table style="border-spacing: 0px;">
            <tr>
                <th style="border: 1px solid white; padding: 10px;">Число соединяемых ЭГО Даров</th>
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
        </table>
        * Ключевые слова на соединяемых ЭГО Дарах не влияют на Ключевое слово итогового ЭГО Дара.<br><br>

        Далее следует прогноз на Ранг ЭГО Даров при соединении 2-х ЭГО Даров. Учитывайте, что при соединении 2-х ЭГО Даров вы можете получить ЭГО Дар до III Ранга.<br>
        <table style="border-spacing: 0px;">
            <tr>
                <th style="border: 1px solid white; padding: 10px;">Ранг соединяемых ЭГО Даров</th>
                <th style="border: 1px solid white; padding: 10px;">Прогноз Ранга ЭГО Дара</th>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 1 + Ранг 1</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 1</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 1 + Ранг 2</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 1</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 1 + Ранг 3</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 2</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 2 + Ранг 2</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 2</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 2 + Ранг 3</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 2</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 3 + Ранг 3</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 3</td>
            </tr>
        </table>
        <br>
        Далее следует прогноз на Ранг ЭГО Даров при соединении 3-х ЭГО Даров. Учитывайте, что при соединении 3-х ЭГО Даров вы можете получить ЭГО Дар до IV Ранга.
        <table style="border-spacing: 0px;">
            <tr>
                <th style="border: 1px solid white; padding: 10px;">Соединение ЭГО Даров под разными Ключевыми словами</th>
                <th style="border: 1px solid white; padding: 10px;">Прогноз Ранга ЭГО Дара</th>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 1 + Ранг 1 + Ранг 1</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 1</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 1 + Ранг 1 + Ранг 2</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 2</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 1 + Ранг 1 + Ранг 3</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 2</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 1 + Ранг 2 + Ранг 2</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 2</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 1 + Ранг 2 + Ранг 3</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 3</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 1 + Ранг 3 + Ранг 3</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 3</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 2 + Ранг 2 + Ранг 2</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 3</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 2 + Ранг 2 + Ранг 3</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 3</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 2 + Ранг 3 + Ранг 3</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 4</td>
            </tr>
            <tr>
                <td style="border: 1px solid white; text-align: center;">Ранг 3 + Ранг 3 + Ранг 3</td>
                <td style="border: 1px solid white; text-align: center;">Ранг 4</td>
            </tr>
        </table>
        <br>
        Однако, если Вы уже собрали все возможные ЭГО Дары под определённым Ключевым словом и/или определённого Ранга, или эти ЭГО Дары уже ожидают Вас в выборе Событий или награды за прохождения Босса этого Этажа, Вы можете получить ЭГО Дар другого Ранга и/или определённого Ключевого слова от того, что Вы выбрали.<br>
        Если же Вы получили все ЭГО Дары определённого Ранга, или же не можете получить их по причине, указанной выше, вы не сможете соединить выбранные ЭГО Дары.<br>
        <br>
        Далее следуют условия, в которых итоговый ЭГО Дар может не соответствовать прогнозам. В таких случаях прогноз будет отображать "(Случайное)" Ключевое слово.<br>
        1) Если все доступные ЭГО Дары под определённым Ключевым словом и предполагаемого Ранга уже были собраны<br>
        2) Если ЭГО Дары под выбранным Ключевым словом и предполагаемого Ранга уже включены в выбор Cобытий или награды за прохождение Босса Этажа. (Тогда ЭГО Дары можно получить на следующем Этаже)<br>
        * Вы не сможете соединить ЭГО Дары после того, как соберёте все ЭГО Дары прогнозируемого Ранга.
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