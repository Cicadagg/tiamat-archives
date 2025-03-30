import { useState, KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "./authUtils";
import RegistrationForm from './RegistrationForm';
import { BingoGame } from './BingoGame';
import "./TurnamentInfo.css";

/**
 * Tournament information component with multiple tabs
 */
export const TurnamentInfo: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [activeTab, setActiveTab] = useState('info');
    const { isAuthorized, password, setPassword, handleCheckPassword, errorMessage, t: tAuth } = useAuth();

    /**
     * Handle Enter key press in password field
     */
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleCheckPassword();
        }
    };

    /**
     * Render content based on active tab
     */
    const renderContent = () => {
        switch (activeTab) {
            case 'info':
                return (
                    <div>
                        <div className="info_title"><h2>{t('TurnamentInfo.info.header')}</h2></div>
                        <ul>
                            <li>{t("TurnamentInfo.description.text1")}</li>
                            <li>{t("TurnamentInfo.description.text2")}</li>
                            <li>{t("TurnamentInfo.description.text3")}</li>
                        </ul>
                    </div>
                );
            case 'registration':
                return (
                    <div>
                        <div className="info_title"><h2>{t('TurnamentInfo.registration.header')}</h2></div>
                        <div className="discrip">{t('TurnamentInfo.registration.text')}</div>
                        <RegistrationForm />
                    </div>
                );
            case 'schedule':
                return (
                    <div>
                        <div className="info_title"><h2>{t('TurnamentInfo.schedule.header')}</h2></div>
                        <div className="discrip">{t('TurnamentInfo.schedule.text')}</div>
                    </div>
                );
            case 'bingo':
                return <BingoGame />;
            default:
                return null;
        }
    };

    return (
        <section className="graditude-info">
            {isAuthorized ? (
                <>
                    <div className="tournament-header">
                        <h1>{t('TurnamentInfo.tournament.header')}</h1>
                    </div>
                    <div className="tournament-info">
                        <div className="image-container2">
                            <div className="image-container">
                                <img 
                                    src="/images/cup-image.png" 
                                    alt="Tournament Cup" 
                                    style={{ width: '12rem', height: 'auto' }} 
                                />
                                <p className="prize-text color-blue">
                                    {t('TurnamentInfo.prize.text')}
                                </p>
                            </div>
                        </div>
                        
                        <div className="info-container">
                            <div className="info_title">
                                <h2>{t('TurnamentInfo.info.header')}</h2>
                            </div>
                            <ul>
                                <li>{t("TurnamentInfo.description.text1")}</li>
                                <li>{t("TurnamentInfo.description.text2")}</li>
                                <li>{t("TurnamentInfo.description.text3")}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="button-container">
                        <nav className="button-list">
                            <ul>
                                {['info', 'registration', 'schedule', 'bingo'].map((tab) => (
                                    <li key={tab}>
                                        <button
                                            onClick={() => setActiveTab(tab)}
                                            className={activeTab === tab ? 'active' : ''}
                                        >
                                            <div className="button-label">
                                                {t(`TurnamentInfo.${tab}.header`)}
                                            </div>
                                        </button>
                                        {activeTab === tab && <div className="button-list-line"/>}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="content-with-guests">
                        <div className="specific-list">
                            {renderContent()}
                        </div>
                        <div className="right-column">
                            <h3>{t('TurnamentInfo.guests.header')}</h3>
                            <div>
                                <h4>{t('TurnamentInfo.guests.organizers')}</h4>
                                <ul>
                                    <li>Имя организатора 1</li>
                                    <li>Имя организатора 2</li>
                                </ul>
                            </div>
                            <div>
                                <h4>{t('TurnamentInfo.guests.commentators')}</h4>
                                <ul>
                                    <li>Имя комментатора 1</li>
                                    <li>Имя комментатора 2</li>
                                </ul>
                            </div>
                            <div>
                                <h4>{t('TurnamentInfo.guests.observers')}</h4>
                                <ul>
                                    <li>Имя обсервера 1</li>
                                    <li>Имя обсервера 2</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="auth-form">
                    <div className="auth-message">
                        <p>{t('TurnamentInfo.tournament.passworldText')}</p>
                    </div>
                    <div className="auth-input">
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={tAuth('TurnamentInfo.password.placeholder')}
                        />
                        <button onClick={handleCheckPassword}>
                            {tAuth('TurnamentInfo.password.submit')}
                        </button>
                    </div>
                    {errorMessage && <div className="auth-error">{errorMessage}</div>}
                </div>
            )}
        </section>
    );
};