import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { IdentityInterface } from '../../../store/reducers/ids-reducer';
import { setMobileModalTrigger } from '../../../store/reducers/mobile-modal-reducer';
import { StatusesInterface } from '../../../store/reducers/statuses-reducer';
import { getStatusesEntityList } from '../../../tools/getStatusesEntityList';
import { TooltipMobile } from '../../tooltip-mobile/TooltipMobile';
import "./EntityFullInfoIdentity.css"

interface IEntityFullInfoProps {
    identity: IdentityInterface;
    maxLvlIdentity: number;
}

const resMap: {
    [key: string]: string
} = {
    'ineff': '[x0.5]',
    'normal': '[x1]',
    'fatal': '[x2]'
}

export const EntityFullInfoIdentity: React.FC<IEntityFullInfoProps> = ({ identity, maxLvlIdentity }) => {
    const { imgUrl, idTier, season, hp, hpStun, speed, defense, slash, pierce, blunt, rarity, sinner, descriptionCoinEN, descriptionPassive1EN, descriptionPassive2EN, releaseDate } = identity;
    const statuses = useQueryClient().getQueryData('statuses') as StatusesInterface[];
    const rarityStyled = rarity.replaceAll("O", "Ø");
    const status = getStatusesEntityList([descriptionCoinEN, descriptionPassive1EN, descriptionPassive2EN]);
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const [imgID, setImgID] = useState('2');
    const isSwitched = imgID === '2'; // New state to track if the image is switched

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

    const defLevelValue = maxLvlIdentity - (-defense);
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

    const toggleImgID = () => {
        setImgID(prevID => (prevID === '1' ? '2' : '1'));
    };

    const shouldShowSwapButton = !(
        imgUrl.startsWith('id_') &&
        parseInt(imgUrl.replace('id_', ''), 10) >= 1 &&
        parseInt(imgUrl.replace('id_', ''), 10) <= 12
      );
    
    return (
        <section className={`${'entityFullInfo-entity'}`} >
            <article
                className={"entityFullInfo-img"}>
                <div className="entityFullInfo-rarity" >{rarityStyled}</div>
                <img className="entityFullInfo-sinner" src={`${process.env.PUBLIC_URL}/images/sinners-icons/${sinner}.webp`} alt={`${sinner}`} />

                <div className={"shadow"}>
                    <img src={`${process.env.PUBLIC_URL}/images/identities-profiles/${imgUrl}.${imgID}_profile.webp`} alt={`${imgUrl}`} />
                </div>
                {shouldShowSwapButton && (
                    <button onClick={toggleImgID} className="image-swap-button">
                        {t(isSwitched ? "EntityFullInfoIdentity.switchImage2" : "EntityFullInfoIdentity.switchImage1")}
                    </button>
                    )}
                
                <div className={`entityFullInfo-tier entityFullInfo-tier-${idTier}`}>
                    {idTier}
                </div>
            </article>
            <div className={`${'entityFullInfo-stats-container'}`} >

                <article className={"entityFullInfo-stats"}>
                    <h2 >{t("EntityFullInfoIdentity.info")}</h2>
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
                </article>... {
                    fuseStatuses && <article className={"entityFullInfo-stats"}>
                        <h2 >{t("EntityFullInfoIdentity.statuses")}</h2>
                        <ul className='statuses-list'>
                            {
                                Object.keys(fuseStatuses).map((s, index) => {
                                    const status = statuses.find(st => st.id == s);
                                    if (!status) return null;
                                    const descriptionKey = `description${i18n.language.toUpperCase()}` as keyof typeof status;
                                    const description = status?.[descriptionKey as keyof typeof status] as string || '';
                                    const nameKey = `name${i18n.language.toUpperCase()}` as keyof typeof status;
                                    const name = status?.[nameKey as keyof typeof status] as string || '';
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
                    <h2 >{t("EntityFullInfoIdentity.stats")}</h2>
                    <ul>
                        <li>
                            <img src={`${process.env.PUBLIC_URL}/images/general/hp.webp`} alt={`${imgUrl}`} />
                            {hp}
                        </li>
                        <li>
                            <img src={`${process.env.PUBLIC_URL}/images/general/speed.webp`} alt={`${imgUrl}`} />
                            {speed}
                        </li>
                        <li>
                            <img src={`${process.env.PUBLIC_URL}/images/general/defense1.webp`} alt={`${imgUrl}`} />
                            {defLevelValue}
                        </li>
                    </ul>
                </article>
                <article className={"entityFullInfo-stats"}>
                    <h2>{t("EntityFullInfoIdentity.res")}</h2>
                    <ul>
                        <li className={`resistance--${blunt}`} >
                            <img src={`${process.env.PUBLIC_URL}/images/general/blunt.webp`} alt={`${imgUrl}`} />
                            {resMap[blunt]}
                        </li>
                        <li className={`resistance--${pierce}`}>
                            <img src={`${process.env.PUBLIC_URL}/images/general/pierce.webp`} alt={`${imgUrl}`} />
                            {resMap[pierce]}
                        </li>
                        <li className={`resistance--${slash}`}>
                            <img src={`${process.env.PUBLIC_URL}/images/general/slash.webp`} alt={`${imgUrl}`} />
                            {resMap[slash]}
                        </li>
                    </ul>
                </article>
                <article className={"entityFullInfo-stats"}>
                    <h2>{t("EntityFullInfoIdentity.stagger")}</h2>
                    <ul className='staggers'>
                        {
                            hpStun.map(
                                (e, index) => {
                                    return <li key={index}>
                                        <span>
                                            {(hp * e / 100).toFixed()} ({e}
                                            <span className='perCent-special-font'>%</span>)
                                        </span>
                                    </li>
                                }
                            )
                        }
                    </ul>
                </article>
            </div>
        </section>
    );

};
