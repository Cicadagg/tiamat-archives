import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { EGOInterface } from '../../../store/reducers/ego-reducer';
import { setMobileModalTrigger } from '../../../store/reducers/mobile-modal-reducer';
import { StatusesInterface } from '../../../store/reducers/statuses-reducer';
import { getStatusesEntityList } from '../../../tools/getStatusesEntityList';
import { TooltipMobile } from '../../tooltip-mobile/TooltipMobile';
import "./EntityFullInfoEGO.css"

interface IEntityFullInfoProps {
    ego: EGOInterface;
}

const resMap: {
    [key: string]: string
} = {
    'ineff': '[x0.5]',
    'normal': '[x1]',
    'fatal': '[x2]',
    'endure': '[x0.75]',
}

export const EntityFullInfoEGO: React.FC<IEntityFullInfoProps> = ({ ego }) => {
    const { sinner, imgUrl, season, egoTier, rarity, descriptionCoinEN, descriptionPassiveEN, wrath, sloth, lust, glut, gloom, pride, envy, egoResists, releaseDate } = ego;
    const { t, i18n } = useTranslation();
    const statuses = useQueryClient().getQueryData('statuses') as StatusesInterface[];
    const rarityStyled = rarity.replaceAll("O", "Ø");
    const status = getStatusesEntityList([descriptionCoinEN, descriptionPassiveEN]);
    const sinsList = ["wrath", "lust", "sloth", "glut", "gloom", "pride", "envy"];
    const energyReqList = [wrath, lust, sloth, glut, gloom, pride, envy].filter(s => s > 0);
    const dispatch = useDispatch();

    const [imgID, setImgID] = useState('1');

    const toggleImgID = () => {
        setImgID(prevID => (prevID === '1' ? '2' : '1'));
    };

    function updateStatusWithFuseStatuses(
        allStatuses: StatusesInterface[],
        status: { [key: string]: number }
    ): { [key: string]: number } {
        const updatedStatus = { ...status };

        for (const id of Object.keys(status)) {
            const foundStatus = allStatuses.find(s => s.id === id);

            if (foundStatus && foundStatus.fuse_statuses) {
                const fuseId = foundStatus.fuse_statuses;

                if (!(fuseId in updatedStatus)) {
                    updatedStatus[fuseId] = 0;
                }
            }
        }
        return updatedStatus;
    }

    const fuseStatuses = updateStatusWithFuseStatuses(statuses, status);

    function excelToDate(excelDate: number) {
        const excelStartDate = new Date(1899, 11, 30);
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const date = new Date(excelStartDate.getTime() + excelDate * millisecondsPerDay);
        return date;
    }

    const formateDate = (date: number) => {
        const newDate = excelToDate(date);
        const month = `${newDate.getMonth() + 1}`;
        const day = `${newDate.getDate()}`;
        return `${day.length === 1 ? `0${day}` : day}.${month.length === 1 ? `0${month}` : month}.${newDate.getFullYear()}`
    }

    function formatDate(date: string | number | Date): string {
        let d: Date;
        if (typeof date === 'string' || typeof date === 'number') {
            d = new Date(date);
        } else if (date instanceof Date) {
            d = date;
        } else {
            return 'Invalid Date';
        }
        if (isNaN(d.getTime())) {
            return 'Invalid Date';
        }
        return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
    }

    function renderCurrValue(value: string | number | Date | string[] | number[], multiplyBy?: number): React.ReactNode {
        if (typeof value === 'string' || typeof value === 'number') {
            value = (multiplyBy) ? Math.ceil(Number(value) * 1.5) : value;
            return value;
        }
        if (value instanceof Date) {
            return formatDate(value);
        }
        if (Array.isArray(value) && multiplyBy === 1) {
            return value.map(v => Math.ceil(Number(v) * 1.5));
        }
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        return null;
    }

    const shouldShowSwapButton = !(
        imgUrl.startsWith('ego_') &&
        parseInt(imgUrl.replace('ego_', ''), 10) >= 1 &&
        parseInt(imgUrl.replace('ego_', ''), 10) <= 12
      );

    return (
        <section className={`${'entityFullInfo-entity'}`} >
            <article className={"entityFullInfo-img"}>
                <div className="entityFullInfo-rarity" >{rarityStyled}</div>
                <img className="entityFullInfo-sinner" src={`${process.env.PUBLIC_URL}/images/sinners-icons/${sinner}.webp`} alt={`${sinner}`} />

                <div className={"shadow"}>
                    <img src={`${process.env.PUBLIC_URL}/images/ego-profiles/${imgUrl}.${imgID}_profile.webp`} alt={`${imgUrl}`} />
                </div>

                {shouldShowSwapButton && (
                <button onClick={toggleImgID} className="image-swap-button">
                    {t(imgID === '1' ? "EntityFullInfoEGO.switchImage1" : "EntityFullInfoEGO.switchImage2")}
                </button>
                )}

                <div className={`entityFullInfo-tier entityFullInfo-tier-${egoTier}`}>
                    {egoTier}
                </div>
            </article>
            <div className='entityFullInfo-stats-container'>

                <article className={"entityFullInfo-stats"}>
                    <h2>{t("EntityFullInfoIdentity.info")}</h2>
                    {
                        !season[1] && <div className={`entityFullInfo-season entityFullInfo-season-${season[0][0] === 'w' ? 'w' : season[0].replace(/^i-/, 's-')}`}>
                            {t(`EntityFullInfoIdentity.season.${season}`)}
                        </div>
                    }
                    {
                        season[1] && <div className={`entityFullInfo-season entityFullInfo-season-${season[1][0] === 'w' ? 'w' : season[0].replace(/^i-/, 's-')}`}>
                            {t(`EntityFullInfoIdentity.season.${season[0]}`)} [{t(`EntityFullInfoIdentity.season.${season[1]}`)}]
                        </div>
                    }
                    <div className={"entityFullInfo-release"}>
                        {t('EntityFullInfoIdentity.release')}
                        &nbsp;{/* Add a non-breaking space here */}
                        <span className="date">{formateDate(releaseDate)}</span>
                    </div>
                </article>

                {
                    fuseStatuses && <article className={"entityFullInfo-stats"}>
                        <h2>{t("EntityFullInfoEGO.statuses")}</h2>
                        <ul className='statuses-list'>
                            {
                                Object.keys(fuseStatuses).map((s, index) => {
                                    const status = statuses.find(st => st.id == s);
                                    if (!status) return null;
                                    const descriptionKey = `description${i18n.language.toUpperCase()}` as keyof typeof status;
                                    const description = status[descriptionKey] as string;

                                    const nameKey = `name${i18n.language.toUpperCase()}` as keyof typeof status;
                                    const name = status[nameKey] as string;
                                    const imgHTML = <img src={`${process.env.PUBLIC_URL}/images/tags/${s}.webp`} alt={`${s}`} />;
                                    const mobileStatusHTML = <TooltipMobile text={description} header={name} image={imgHTML} />;
                                    return <li onClick={() => setMobileModalTrigger(dispatch, mobileStatusHTML)} key={index} className='tooltip-container '>
                                        {imgHTML}
                                        <span className='entityFullInfo-tooltip '>
                                            {t("SkillCoinDescription.clickToSeeDescription")}
                                        </span>
                                    </li>
                                })
                            }
                        </ul>
                    </article>
                }
                <article className={"entityFullInfo-stats"}>
                    <h2>{t("EntityFullInfoEGO.cost")}</h2>
                    <ul className='ego-cost-list'>
                        <li >
                            <img src={`${process.env.PUBLIC_URL}/images/general/sanity.webp`} alt={`sanity`} />
                            <span>{ego.sanity[0]}
                                {ego.sanity[1] && <>|
                                    <span style={{ color: "red" }}>{ego.sanity[1]}</span></>}
                            </span>
                        </li>
                        {
                            sinsList.map((sin, index) => {
                                if (energyReqList.length >= 6 && index > 2) return null
                                const curr = ego[sin as keyof typeof ego];
                                if (curr === 0) return null;
                                return <li key={index}>
                                    <img src={`${process.env.PUBLIC_URL}/images/sins/${sinsList[index]}.webp`} alt={`${sinsList[index]}`} />
                                    <span>{renderCurrValue(curr, 0)}
                                        {ego.imgUrl && !["ego_1", "ego_2", "ego_3", "ego_4", "ego_5", "ego_6", "ego_7", "ego_8", "ego_9", "ego_10", "ego_11", "ego_12"].includes(ego.imgUrl) && <> |
                                            <span style={{ color: "red", display: "inline" }}>{renderCurrValue(curr, 1)}</span>
                                        </>}
                                    </span>
                                </li>
                            })
                        }
                    </ul>
                    {
                        energyReqList.length >= 6 && <ul className='ego-cost-list'>
                            {
                                sinsList.map((sin, index) => {
                                    if (energyReqList.length >= 6 && index <= 2) return null;
                                    const curr = ego[sin as keyof typeof ego];
                                    if (curr === 0) return null;
                                    return <li key={index}>
                                        <img src={`${process.env.PUBLIC_URL}/images/sins/${sinsList[index]}.webp`} alt={`${sinsList[index]}`} />
                                        <span>{renderCurrValue(curr, 0)}
                                            {<>|
                                                <span style={{ color: "red", display: "inline" }}>{renderCurrValue(curr, 1)}</span>
                                            </>}
                                        </span>
                                    </li>
                                })
                            }
                        </ul>
                    }
                </article>
                <article className={"entityFullInfo-stats"}>
                    <h2>{t("EntityFullInfoEGO.res")}</h2>
                    {
                        <ul className='ego-resists'>
                            {
                                egoResists.map((res, index) => {
                                    if (index > 2) return null;
                                    return <li key={index}>
                                        <img src={`${process.env.PUBLIC_URL}/images/sins/${sinsList[index]}.webp`} alt={`${sinsList[index]}`} />
                                        {resMap[res.toLowerCase().replace(" ", "")]}
                                    </li>
                                })
                            }
                        </ul>
                    }
                    {
                        <ul className='ego-resists'>
                            {
                                egoResists.map((res, index) => {
                                    if (index <= 2) return null;
                                    return <li key={index}>
                                        <img src={`${process.env.PUBLIC_URL}/images/sins/${sinsList[index]}.webp`} alt={`${sinsList[index]}`} />
                                        {resMap[res.toLowerCase().replace(" ", "")]}
                                    </li>
                                })
                            }
                        </ul>
                    }
                </article>
            </div>

        </section>
    );
};
