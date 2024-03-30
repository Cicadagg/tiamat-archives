import React from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { TbItem } from "../tb-item/TbItem";

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


