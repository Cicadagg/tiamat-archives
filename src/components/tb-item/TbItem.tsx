import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../store/reducers/ids-reducer";
import { tbAddEntityAction, tbRemoveEntityAction } from "../../store/reducers/tb-reducer";
import { isIdentity as isIdentityFunction} from "../../tools/isIdentity";
import { AddSVG } from "../svg/AddSVG";
import { ChangeSVG } from "../svg/ChangeSVG";
import { RemoveSVG } from "../svg/RemoveSVG";
import "./TbItem.css";
interface TbItemInterface{
    entity:EGOInterface|IdentityInterface;
}
export const TbItem:React.FC<TbItemInterface> = ({entity}) => {
    const isIdentity = isIdentityFunction(entity);
    const imgUrl = isIdentity ? `identities/${entity.imgUrl}` : `ego/${entity.imgUrl}`;
    const rarity = isIdentity ? entity.rarity.replaceAll("O","Ø") : entity.rarity;
    const frameColorClass = isIdentity ? `tb-item-frame--${entity.rarity}` : `${entity.egoSin}-sin-color`;
    const {modalTrigger} = useTypedSelector(store => store.tbReducer);
    
    const dispatch = useDispatch();
   
    const svgType = () => {
        if(isIdentity){
            const currIdentity = modalTrigger?.identity;
            if(!currIdentity) return <AddSVG active={false}/>;
            if(currIdentity === entity) return <RemoveSVG active={false}/>;
            return <ChangeSVG active={false}/>;
        }
        for(const key in modalTrigger?.ego){
            if (entity.rarity === key){
            const currEGO = modalTrigger?.ego[key];
            if(!currEGO) return <AddSVG active={false}/>;
            if(currEGO === entity) return <RemoveSVG active={false}/>;
            return <ChangeSVG active={false}/>;
            } 
        }
        return <></>
    }
   
    const handleItemClick = () => {
        if(!modalTrigger) return;
        
        if(isIdentity){
            if(modalTrigger.identity === entity) {
                tbRemoveEntityAction(dispatch,entity,modalTrigger);
            } else {
                tbAddEntityAction(dispatch,entity,modalTrigger);
            }
            return;
        }

        if(modalTrigger.ego[entity.rarity] === entity) {
            tbRemoveEntityAction(dispatch,entity,modalTrigger);
        } else {
            tbAddEntityAction(dispatch,entity,modalTrigger);
        }
    }
    return (
        <div onClick={()=>handleItemClick()} className={"tb-item-container"}>
            <div className={"shadow"}>
                <img src={`${process.env.PUBLIC_URL}/images/${imgUrl}.webp`} alt={`${imgUrl}`}/>
            </div>
            {svgType()}
            { !!(+entity.isNew) && <span className={"tb-item-new"} >NEW</span>}
            <div className={"tb-item-rarity"} >{rarity}</div>
            <div className={["tb-item-frame",frameColorClass].join(" ")} ></div>
        </div>
    )
}