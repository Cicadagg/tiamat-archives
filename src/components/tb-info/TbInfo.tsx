import React from "react";
import { useTranslation } from "react-i18next";
import { JSX } from "react/jsx-runtime";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getStatusesEntityList } from "../../tools/getStatusesEntityList";
import "./TbInfo.css";

type TbInfoInterface = {  
    attribure:string , 
    type: "tags"|"sins",
};
export const TbInfo:React.FC<TbInfoInterface> = ({attribure,type}) => {
    const {t,i18n} = useTranslation();
    const {slots} = useTypedSelector(store => store.tbReducer);
    const countReq = (entity:any,sin:string) =>{
        let count = 0;
        if(entity.skillsSin[0] === sin) count+=3;    
        if(entity.skillsSin[1] === sin) count+=2;    
        if(entity.skillsSin[2] === sin) count+=1;    
        return count;
    }
    const energyGenList = (sin:string) =>{
        let result: JSX.Element[] = [];
        for(let i =0 ; i< slots.length ; i++){
            const slot = slots[i];
            if (!slot.identity) continue;
            let count = countReq(slot.identity,sin);
            if (!count) continue;
            result.push(
                <div key={`${attribure}${slot.identity.imgUrl}`}>
                    <img className="tb-info-img" src={`${process.env.PUBLIC_URL}/images/identities/${slot.identity.imgUrl}.webp`}></img> 
                    <span className="tb-info-count">x{count}</span>
                </div>
            ) 
        }
        return result;
    }
    const energyConsumeList = (sin:string) =>{
        let result: JSX.Element[] = [];
        for(let i =0 ; i< slots.length ; i++){
            const slot = slots[i];
            if (!slot.ego) continue;
            for(const key in slot.ego){
                let current = slot.ego[key];
                if(!current) continue;
                let count = current[sin as keyof typeof current];
                if(!count) continue;
                result.push(
                    <div  key={`${attribure}${current.imgUrl}`}>
                        <img className="tb-info-img" src={`${process.env.PUBLIC_URL}/images/ego/${current.imgUrl}.webp`}></img> 
                        <span className="tb-info-count">x{count}</span>
                    </div>
                )
            }
        }
        return result;
    }
    const tagsListIdentity = (tag:string) =>{
        let result = [];
        for(let i = 0 ; i < slots.length;i++){
            let slot = slots[i];
            if(!slot.identity) continue;
            const {descriptionCoinEN,descriptionPassive1EN,descriptionPassive2EN} = slot.identity;
            if (Object.keys(getStatusesEntityList([descriptionCoinEN,descriptionPassive1EN,descriptionPassive2EN])).includes(tag)){
                result.push(
                    <div key={`${attribure}${slot.identity.imgUrl}`}>
                        <img className="tb-info-img" src={`${process.env.PUBLIC_URL}/images/identities/${slot.identity.imgUrl}.webp`}></img> 
                        <span className="tb-info-count">x1</span>
                    </div>
                ) 
            } 

        }
        return result;
    }
    const tagsListEGO = (tag:string) =>{
        let result: JSX.Element[] = [];
        for(let i = 0 ; i < slots.length;i++){
            let slot = slots[i];
            const slotEgoKeys = Object.keys(slot.ego);
            for(let j = 0; j < slotEgoKeys.length; j++){
                let current = slot.ego[slotEgoKeys[j]];
                if(!current) continue;
                const {descriptionCoinEN,descriptionPassiveEN} = current;
                if(Object.keys(getStatusesEntityList([descriptionCoinEN,descriptionPassiveEN])).includes(tag)){
                    result.push(
                        <div key={`${attribure}${current.imgUrl}`}>
                            <img className="tb-info-img" src={`${process.env.PUBLIC_URL}/images/ego/${current.imgUrl}.webp`}></img> 
                            <span className="tb-info-count">x1</span>
                        </div>
                    )
                }
            }
           
        }
        return result;
    }
    const sinsLayout = () =>{
        const genList = energyGenList(attribure);
        const consumeList = energyConsumeList(attribure);
        return(
            <>
                {genList.length > 0 && <>
                    <span className="tb-info-header" >{t("TbInfo.energyGain")}</span>
                    <div className="tb-info-container">
                        {genList}
                    </div>
                </>
                }
               
                {consumeList.length > 0 && <>
                    <span className="tb-info-header" >{t("TbInfo.energyConsumption")}</span>
                    <div className="tb-info-container">
                        {consumeList}
                    </div>
                </>
                }
            </>
        )
    }
    const tagsLayout = () =>{
        const tagsIdentity = tagsListIdentity(attribure);
        const tagsEGO = tagsListEGO(attribure);
        if(type!=="tags") return;
        return <>
            {tagsIdentity.length > 0 && <>
                <span className="tb-info-header" >{t("TbInfo.ids")}</span>
                <div className="tb-info-container">
                    {tagsIdentity}
                </div> 
            </>}
            {tagsEGO.length > 0 && <>
                <span className="tb-info-header" >{t("TbInfo.ego")}</span>
                <div className="tb-info-container">
                        {tagsEGO}
                </div> 
            </>}
        </>
    }
    return (
        <div className="tb-info">
            {type === "tags" ?  tagsLayout(): sinsLayout()}
            <div className={"tb-info-arrow"}> </div>
        </div>
    )
}