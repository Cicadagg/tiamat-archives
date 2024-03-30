import React, { useEffect, useRef} from "react";
import { useDispatch } from "react-redux";
import { sinType } from "../../../constants/types";
import useHover from "../../../hooks/useHover";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { EGOInterface } from "../../../store/reducers/ego-reducer";
import { SlotInterface, tbResetHoverAction, tbSetHoverAction } from "../../../store/reducers/tb-reducer";
import {tbResetSlotAction, tbTriggerModalAction } from "../../../store/reducers/tb-reducer";
import { getStatusesEntityList } from "../../../tools/getStatusesEntityList";
import { IdentitySVG } from "../../svg/IdentitySVG";

export const TbSlot:React.FC<{slot:SlotInterface,index:number}> = ({slot,index}) => {
    const dispatch = useDispatch();

    const refSlot = useRef(null);
    const isHoveringSlot = useHover(refSlot);

    const refSlotIdentity = useRef(null);
    const isHoveringSlotIdentity = useHover(refSlotIdentity);

    const refSlotEGO = useRef(null);
    const isHoveringSlotEGO = useHover(refSlotEGO);

    const refSlotZAYIN = useRef(null);
    const isHoveringSlotZAYIN = useHover(refSlotZAYIN);
    const refSlotALEPH = useRef(null);
    const isHoveringSlotALEPH = useHover(refSlotALEPH);
    const refSlotHE = useRef(null);
    const isHoveringSlotHE = useHover(refSlotHE);
    const refSlotTETH = useRef(null);
    const isHoveringSlotTETH = useHover(refSlotTETH);
    const refSlotWAW = useRef(null);
    const isHoveringSlotWAW = useHover(refSlotWAW);

    const tbHoverState = useTypedSelector(store=>store.tbReducer).hover;
    const {ego,identity} = slot;
    const {ZAYIN,ALEPH,HE,TETH,WAW} = ego;
    const egosMap = [
        {
            ego:ZAYIN,
            ref:refSlotZAYIN,
            isHovering:isHoveringSlotZAYIN,
            glyph:"ז",
        },
        {
            ego:TETH,
            ref:refSlotTETH,
            isHovering:isHoveringSlotTETH,
            glyph:"ו",
        },
        {
            ego:HE,
            ref:refSlotHE,
            isHovering:isHoveringSlotHE,
            glyph:"ה",
        },
        {
            ego:WAW,
            ref:refSlotWAW,
            isHovering:isHoveringSlotWAW,
            glyph:"ℵ",
        },
        {
            ego:ALEPH,
            ref:refSlotALEPH,
            isHovering:isHoveringSlotALEPH,
            glyph:"ט",
        },
    ];
    const isHoveringEGO = () => {
        return isHoveringSlotWAW || isHoveringSlotTETH || isHoveringSlotHE || isHoveringSlotALEPH || isHoveringSlotZAYIN;
    }

    const tbEGOHoverMatch = (ego:EGOInterface|null) =>{
        if(!tbHoverState) return false;
        if(!ego)return false;
        if(tbHoverState.type === "sin"){
            let a = ego[tbHoverState.trigger as keyof typeof ego];
            if ( a && a > 0) return true;
        }else if (tbHoverState.type === "tag") {
            const {descriptionCoinEN,descriptionPassiveEN} = ego;
            if (Object.keys(getStatusesEntityList([descriptionCoinEN,descriptionPassiveEN])).includes(tbHoverState.trigger)) return true;
        }
        return false;
    }
    const tbIdentityHoverMatch = () => { 
        if(!tbHoverState) return false;
        if(!slot.identity)return false;
        if(tbHoverState.type === "sin"){
            const {skillsSin} = slot.identity;
            if (skillsSin.includes(tbHoverState.trigger as sinType)) return true;
        }else if (tbHoverState.type === "tag") {
            const {descriptionCoinEN,descriptionPassive1EN,descriptionPassive2EN} = slot.identity;
            if (Object.keys(getStatusesEntityList([descriptionCoinEN,descriptionPassive1EN,descriptionPassive2EN])).includes(tbHoverState.trigger)) return true;
        }
        return false;
    }
    const isSlotEmpty = () =>{
        if(slot.identity)return false;
        for(const key in slot.ego) if(slot.ego[key])return false;
        return true;
    }
    useEffect(()=>{
        if(isHoveringSlotIdentity && slot.identity){
            tbSetHoverAction(dispatch,{type:"slot-identity",trigger:slot.identity});
        }
        else if(isHoveringEGO()){
            for(let i = 0 ; i < egosMap.length;i++)
                if(egosMap[i].isHovering && egosMap[i].ego) tbSetHoverAction(dispatch,{type:"slot-ego",trigger:egosMap[i].ego as EGOInterface}); 
        } 
        else if(isHoveringSlot && !isHoveringSlotIdentity && !isHoveringSlotEGO) tbSetHoverAction(dispatch,{type:"slot",trigger:slot}); 
        return () => {
            tbResetHoverAction(dispatch);
        }
        
    },[isHoveringSlotIdentity,isHoveringSlot,isHoveringSlotWAW ,isHoveringSlotTETH ,isHoveringSlotHE ,isHoveringSlotALEPH ,isHoveringSlotZAYIN]) 

    return (
    <div ref={refSlot} className={["tb-slots-slot", (isHoveringSlot && !isHoveringSlotIdentity && !isHoveringSlotEGO && !isHoveringEGO() && !isSlotEmpty()) ? "tb-slots-slot--active" : ""].join(" ")} onClick={()=> tbTriggerModalAction(dispatch,slot)}>
        <div className="tb-slots-X" onClick={(e)=>{ e.stopPropagation(); tbResetSlotAction(dispatch,index)}} >&#10006;</div>
        <div className="tb-slots-tooltip">Click to edit</div>

        <div ref={refSlotIdentity} className={["tb-slots-container-id",
        tbIdentityHoverMatch() ? "tb-slots-container-id--active" : "",
        (isHoveringSlotIdentity && slot.identity) ? "tb-slots-container-id--active" : "",
        !slot.identity ? "tb-slots-empty" : ""].join(" ")}>

            <div className={[(!identity) ? "": "shadow" ].join(" ") }>
                { (!identity) ? <IdentitySVG/>:<img src={`${process.env.PUBLIC_URL}/images/identities/${identity.imgUrl}.webp`} alt={`identities/${identity.imgUrl}`}/>}
            </div>

        </div>

        <div ref={refSlotEGO}  className="tb-slots-container-ego" >
            {egosMap.map(({ego,isHovering,ref,glyph},index)=>{
                return <div ref={ref} key={index} className={["tb-slots-slot-ego" ,
                    tbEGOHoverMatch(ego) ? "tb-slots-slot-ego--active" : "",
                    (isHovering && ego) ? "tb-slots-slot-ego--active" : "",
                    !ego ? "tb-slots-empty" : ""].join(" ")}>
                        
                    {(!ego) 
                        ? <span >{glyph}</span>
                        : <>
                            <div className={"shadow"}>
                                <img src={`${process.env.PUBLIC_URL}/images/ego/${ego.imgUrl}.webp`} alt={`ego/${ego.imgUrl}`}/>
                            </div>
                            <div className={["tb-ego-frame",`${ego.egoSin}-sin-color`].join(" ")}/>
                        </>
                    }
                    
                </div>
            })}
        </div>
    </div>  
    )
}
