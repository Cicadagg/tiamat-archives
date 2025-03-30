import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./RegistrationForm.css";

interface FormData {
    name: string;
    discordNick: string;
    email: string;
    tournamentType: string;
    aboutSelf: string;
}

const RegistrationForm = () => {
    const { t } = useTranslation();
    
    const [formData, setFormData] = useState<FormData>({
        name: '',
        discordNick: '',
        email: '',
        tournamentType: 'Бинго',
        aboutSelf: ''
    });
    
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const submitted = localStorage.getItem('tournamentFormSubmitted');
        setIsSubmitted(submitted === 'true');
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (isSubmitted) {
            setError(t('TurnamentInfo.registration.alreadySubmitted'));
            return;
        }

        if (!formData.name || !formData.discordNick || !formData.email) {
            setError(t('TurnamentInfo.registration.validationError'));
            return;
        }
        
        setIsSubmitting(true);
        setError("");

        try {
            const formEntries = Object.entries(formData);
            const searchParams = new URLSearchParams(formEntries as [string, string][]);

            const response = await fetch('https://script.google.com/macros/s/AKfycbxbHBvLKSwnRKEMET16DVVYoezV0_4eQPUOOmaqaJ9b4bXMmMZ4fB85P7R3PrZPgxLE/exec', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: searchParams.toString()
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                setError(`Ошибка ${response.status}: ${errorText}`);
                return;
            }
            
            setSuccess(true);
            localStorage.setItem('tournamentFormSubmitted', 'true');
            setIsSubmitted(true);
        } catch (err) {
            console.error('Ошибка при отправке формы:', err);
            setError(t('TurnamentInfo.registration.networkError'));
        } finally {
            setIsSubmitting(false);
        }
        
    };

    if (isSubmitted) {
        return (
            <div className="registration-submitted">
                <h3>{t('TurnamentInfo.registration.thankYou')}</h3>
                <p>{t('TurnamentInfo.registration.alreadySubmitted')}</p>
            </div>
        );
    }

    return (
        <div className="registration-form-container">
            {success ? (
                <div className="registration-success">
                    <h3>{t('TurnamentInfo.registration.thankYou')}</h3>
                    <p>{t('TurnamentInfo.registration.successMessage')}</p>
                    <button className="submit-button" disabled>
                        {t('TurnamentInfo.registration.submitted')}
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="form-group">
                        <label htmlFor="name">{t('TurnamentInfo.registration.name')}</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="discordNick">{t('TurnamentInfo.registration.discordNick')}</label>
                        <input
                            type="text"
                            id="discordNick"
                            name="discordNick"
                            value={formData.discordNick}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">{t('TurnamentInfo.registration.email')}</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                   <div className="form-group">
                        <label htmlFor="tournamentType">{t('TurnamentInfo.registration.tournamentType')}</label>
                        <select
                            id="tournamentType"
                            name="tournamentType"
                            value={formData.tournamentType}
                            onChange={handleChange}
                        >
                            <option value="Бинго">{t('TurnamentInfo.registration.standardType')}</option>
                            <option value="Потнич">{t('TurnamentInfo.registration.advancedType')}</option>
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="aboutSelf">{t('TurnamentInfo.registration.aboutSelf')}</label>
                        <textarea
                            id="aboutSelf"
                            name="aboutSelf"
                            value={formData.aboutSelf}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>
                    
                    {error && <div className="form-error">{error}</div>}
                    
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting 
                            ? t('TurnamentInfo.registration.submitting') 
                            : t('TurnamentInfo.registration.submit')}
                    </button>
                </form>
            )}
        </div>
    );
};

export default RegistrationForm;
