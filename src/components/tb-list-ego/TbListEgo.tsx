import React from "react";
import { useTranslation } from "react-i18next";

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
