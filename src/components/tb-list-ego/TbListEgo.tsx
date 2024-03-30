import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { TbItem } from "../tb-item/TbItem";
interface ITbListEGO {
    jsxElementsNew:React.ReactNode[],
    jsxElements:React.ReactNode[],
}
export const TbListEGO:React.FC<ITbListEGO> = ({jsxElements,jsxElementsNew}) => {
    const {t,i18n} = useTranslation();
    

    return <>
    {
        !!((jsxElements?.length || 0) + jsxElementsNew.length )
        ? <div  className={"tb-list-content"} >
            {jsxElementsNew}
            {jsxElements}
        </div>
        : <p>{t("TbListEGO.empty")}</p> 
    }
    </>
}
