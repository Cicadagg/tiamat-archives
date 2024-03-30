
import React from "react";
import { useTranslation } from "react-i18next";
import "./LoadingAnimation.css";
type TLoadingAnimationProps = {
  failureCount?:number
}
export const LoadingAnimation:React.FC<TLoadingAnimationProps> = ({failureCount = 0}) => {
    const {t} = useTranslation();
    return (
        <div className="loading-container">
          <div className="loading">
          {t("LoadingAnimation.text")}
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">. </span>
          </div>
          <span className="delay-info">{failureCount > 2 && t("LoadingAnimation.delay")}</span>
        </div>
    )
}