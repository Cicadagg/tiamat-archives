import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import "./MirrorDungeonNav.css";

export const MirrorDungeonNav:React.FC = () => {
    const params = useParams();
    const type = params["type"];
    const {t,i18n} = useTranslation();
    const routes = [
        {
            path:"events",
            name:t("MirrorDungeonNav.events")
        },
        {
            path:"gifts",
            name:t("MirrorDungeonNav.gifts")
        },
        {
            path:"rest-stops",
            name:t("MirrorDungeonNav.rest-stops")
        }
    ];
    return (
        <div className={"tier-list-nav-container"}>
            <nav className={"tier-list-nav"}>
                <ul>
                    {
                        routes.map((route)=>{
                            return(
                                <li key={`${route.path}`}>
                                    <Link 
                                    className={type === route.path ? "tier-list-nav--active" : ""} 
                                    to={`/${i18n.language}/mirror-dungeon/${route.path}`}>
                                        {route.name}
                                    </Link>
                                    {type === route.path && <div className="tier-list-nav-line"/>}
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}
