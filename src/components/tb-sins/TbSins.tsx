import React from "react";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { TbSin } from "./tb-sin/TbSin";
import "./TbSins.css";

export const TbSins = () =>{
    const sins = ["wrath","lust","sloth","glut","gloom","pride","envy"];
    const {energy} = useTypedSelector(state=> state.tbReducer);
    const {t} = useTranslation();
    return (
        <section className="tb-sins">
            <h2 className="tb-sins-header"> {t("TbSins.header")}</h2>
            <div className="tb-sins-container">
                {sins.map((sin,index)=>{
                    return(
                        <TbSin key={index} energy={energy} sin={sin}></TbSin>
                    )
                })}
            </div>
        </section>
    )
}
