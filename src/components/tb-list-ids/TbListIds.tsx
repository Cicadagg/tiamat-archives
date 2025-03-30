import React from "react";
import { useTranslation } from "react-i18next";

interface ITbListIds {
    jsxElementsNew:React.ReactNode[],
    jsxElements:React.ReactNode[],
}
export const TbListIds: React.FC<ITbListIds> = ({jsxElements,jsxElementsNew}) => {
    const {t} = useTranslation();
    return <>
    {
        !!((jsxElements?.length || 0) + jsxElementsNew.length )
        ? <div  className={"tb-list-content"} >
             {jsxElementsNew}
            {jsxElements}
        </div>
        : <p>{t("TbListIds.empty")}</p> 
    }
        
    </>;
};


