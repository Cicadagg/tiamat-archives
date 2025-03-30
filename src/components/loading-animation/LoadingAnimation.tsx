import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./LoadingAnimation.css";

type TLoadingAnimationProps = {
  failureCount?: number;
};

export const LoadingAnimation: React.FC<TLoadingAnimationProps> = ({ failureCount = 0 }) => {
  const { t } = useTranslation();
  const [delayText, setDelayText] = useState("");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (failureCount > 2) {
      const generateRandomDelayText = () => {
        const randomDelay = Math.floor(Math.random() * 14) + 1; // Генерируем случайное число от 1 до 14
        setDelayText(t(`LoadingAnimation.delay${randomDelay}`)); // Установить текст задержки

        timeoutId = setTimeout(() => {
          generateRandomDelayText(); // Обновляем текст задержки через 10 секунд
        }, 10000); // Таймаут на 10 секунд
      };

      generateRandomDelayText();

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [failureCount, t]);

  const handleMouseOver = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseOut = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="loading-container">
      <div className="image-container">
        <img 
          src="/images/general/loading.webp" 
          alt="Loading Animation" 
          className="loading-image" 
          onMouseOver={handleMouseOver} 
          onMouseOut={handleMouseOut} 
        />
        {isTooltipVisible && (
          <div className="tooltip">
            {t("LoadingAnimation.tooltip")}
          </div>
        )}
      </div>
      <div className="loading">
        {t("LoadingAnimation.text")}
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
      <span className="delay-info">{failureCount > 2 && delayText}</span>
    </div>
  );
};
