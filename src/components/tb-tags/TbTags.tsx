import React from "react";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { getStatusesEntityList } from "../../tools/getStatusesEntityList";
import { TbTag } from "./tb-tag/TbTag";
import "./TbTags.css";
export const TbTags:React.FC = () => {
    const {slots} = useTypedSelector(state=> state.tbReducer);
    const getListOfTags = () =>{
        let result:{count:number,tag:string}[] =[];
        let tagsMap:{[key:string]:number} = {};
        slots.forEach((slot,index)=>{
            const {ego,identity} = slot;
            let tags:string[] = [];
            if(identity){
                const {descriptionCoinEN,descriptionPassive1EN,descriptionPassive2EN} =identity;
                tags = Object.keys(getStatusesEntityList([descriptionCoinEN,descriptionPassive1EN,descriptionPassive2EN]));
            } 
            for(const key in ego){
                const currentEGO = ego[key];
                if(currentEGO){
                    const {descriptionCoinEN,descriptionPassiveEN} = currentEGO;
                    tags.push(...Object.keys(getStatusesEntityList([descriptionCoinEN,descriptionPassiveEN])))
                }
            }
            tags.forEach((tag)=>{
                if(tag in tagsMap)tagsMap[tag]+= 1;
                else tagsMap[tag] = 1;
            })
        })
        
        for(const key in tagsMap){
            result.push(
                {
                    count: tagsMap[key],
                    tag:key
                }
            )
        }

        result.sort((a, b) => b.count - a.count);

        return result;
    }
    const listOfTags = getListOfTags();
    const {t} = useTranslation();
    return (
        <section className="tb-tags">
            <h2 className="tb-tags-header"> {t("TbTags.header")}</h2>
            <div className="tb-tags-container">
                {listOfTags.map(({count,tag})=>{
                    return(
                        <TbTag key={tag} tag={tag} count={count}></TbTag>
                    )
                })}
                {!listOfTags.length && <p>{t("TbTags.empty")} </p>}
            </div>
        </section>
    )
}
