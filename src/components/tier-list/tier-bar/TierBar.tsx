import React, {useRef} from "react";
import { useTranslation } from "react-i18next";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import "./TierBar.css";
interface TierBarProps {
    rating:string;
    description:string;
    children:React.ReactElement;
    count:number;
}
export const TierBar:React.FC<TierBarProps> = ({count, rating,description,children}) => {
    const {t} = useTranslation();
    const containerRef = useRef(null);
    const {isVisible} = useIntersectionObserver(containerRef,0.1);

    return (
        <article ref={containerRef} className={["tier-bar-container" , `tier-bar-container--${rating}`, isVisible && "tier-bar-container--animated"].join(" ")}>
            <div className={["tier-bar-line" , `tier-bar-line--${rating}`].join(" ")}></div>
            <h3 className={"tier-bar-rating"}>{`${rating.toUpperCase()} ${t("TierBar.tier")} (${count})`}</h3>
            <p className={["tier-bar-description" , `tier-bar-description--${rating}`].join(" ")}> {description} </p>
            <div className={"tier-bar-items"}>
                {children} 
            </div>
        </article>
    )
}
