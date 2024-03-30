import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { isFilterMatching } from "../../tools/isFilterMatching";
import { Filters } from "../filters/Filters";
import { TbItem } from "../tb-item/TbItem";
import { TbListEGO } from "../tb-list-ego/TbListEgo";
import { TbListIds } from "../tb-list-ids/TbListIds";
import "./TbList.css";

type TTabOption = "ego" | "identity";

export const TbList:React.FC = () => {
    const ids = useQueryClient().getQueryData("identities") as IdentityInterface[]|null;
    const egos = useQueryClient().getQueryData("ego") as EGOInterface[]|null;
    const [tabOption, settabOption] = useState<TTabOption>("identity");
    
    const {t,i18n} = useTranslation();
    const {slots,modalTrigger} = useTypedSelector(store => store.tbReducer);
    const filterState = useTypedSelector(store => store.filterReducer);
    const searchState = useTypedSelector(store => store.searchReducer);

    const isSameSinnerId = (entity:IdentityInterface) => {
        let sinner = entity.sinner;

        for (const key in modalTrigger?.ego) {
            const currEGO = modalTrigger?.ego[key as keyof typeof  modalTrigger.ego];
            if (currEGO) return sinner === currEGO.sinner ;
        }  

        if (modalTrigger?.identity) return sinner === modalTrigger?.identity.sinner 

        return true; 
    }
    const isSameSinnerEGO = (entity:EGOInterface) => {
        let sinner = entity.sinner;

        for (const key in modalTrigger?.ego) {
            const currEGO = modalTrigger?.ego[key as keyof typeof  modalTrigger.ego];
            if (currEGO) return sinner === currEGO.sinner ;
        }  

        if (modalTrigger?.identity) return sinner === modalTrigger?.identity.sinner 

        return true; 
    }
    const isAvailibleSinnerId = (entity:IdentityInterface) => {
        let sinner = entity.sinner;
        for(let i =0;i < slots.length;i++){
            let currentSlot = slots[i];
            if(currentSlot === modalTrigger) continue;
            for (const key in currentSlot?.ego) {
                const currEGO = currentSlot?.ego[key];
                if (currEGO){
                    if (currEGO.sinner === sinner) return false;
                    break;
                } 
            }  
            if (currentSlot?.identity?.sinner === sinner) return false;
        }
        return true; 
    }
    const isAvailibleSinnerEGO = (entity:EGOInterface) => {
        let sinner = entity.sinner;
        for(let i =0;i < slots.length;i++){
            let currentSlot = slots[i];
            if(currentSlot === modalTrigger) continue;
            for (const key in currentSlot?.ego) {
                const currEGO = currentSlot?.ego[key];
                if (currEGO){
                    if (currEGO.sinner === sinner) return false;
                    break;
                } 
            }  
            if (currentSlot?.identity?.sinner === sinner) return false;
        }
        return true; 
    }

    const jsxElementsIdsNew:React.ReactNode[] = []
    const jsxElementsIds = ids?.reduceRight((acc:React.ReactNode[] , entity) => {
        if (modalTrigger !== null && !isSameSinnerId(entity) ) return acc;
        if (!isFilterMatching(filterState,searchState,entity,i18n.language)) return acc;
        if (!isAvailibleSinnerId(entity)) return acc;
        if (!!(+entity.isNew)){
            jsxElementsIdsNew.push(<TbItem key={entity.imgUrl} entity={entity} />)
            return acc;
        } 
        acc.push(<TbItem key={entity.imgUrl} entity={entity} />)
        return acc;
    },[]) || [];
    
    const jsxElementsEGONew:React.ReactNode[] = [];
    const jsxElementsEGO = egos?.reduceRight((acc:React.ReactNode[] ,entity) => {
        if (modalTrigger !== null && !isSameSinnerEGO(entity) ) return acc;
        if (!isFilterMatching(filterState,searchState,entity,i18n.language)) return acc;
        if (!isAvailibleSinnerEGO(entity)) return acc;
        if (!!(+entity.isNew)){
            jsxElementsEGONew.push(<TbItem key={entity.imgUrl} entity={entity} />)
            return acc;
        } 
        acc.push(<TbItem key={entity.imgUrl} entity={entity} />)
        return acc;
    },[])|| [];

    return (
        <div className={"tb-list-container"} >
            <Filters></Filters>
            <div style={{display:"flex" , gap:"12px" ,marginBottom:"4px"}}> 
                <span onClick={()=>{settabOption("identity")}} className={`tb-list-header ${tabOption === "identity" ? "tb-list-header--active" : ""}`} > 
                    {`${t("TbListIds.header")} (${(jsxElementsIds?.length || 0) + jsxElementsIdsNew.length})`}
                    {tabOption === "identity" && <span className="tb-list-header-line"/> }
                </span>
                <span onClick={()=>{settabOption("ego")}} className={`tb-list-header ${tabOption === "ego" ? "tb-list-header--active" : ""}`} > 
                    {`${t("TbListEGO.header")} (${ (jsxElementsEGO?.length || 0) + jsxElementsEGONew.length})`}  
                    {tabOption === "ego" && <span className="tb-list-header-line"/> }
                </span>
            </div>
            {
                tabOption === "identity" ?
                <TbListIds jsxElements={jsxElementsIds} jsxElementsNew={jsxElementsIdsNew}/>
                : 
                <TbListEGO jsxElements={jsxElementsEGO} jsxElementsNew={jsxElementsEGONew}/>

            }
            
            
        </div>
    )
}