import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { mobileLayoutFrom } from "../../../constants/mobileLayoutFrom";
import useHover from "../../../hooks/useHover";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { EGOInterface } from "../../../store/reducers/ego-reducer";
import { IdentityInterface } from "../../../store/reducers/ids-reducer";
import { setMobileModalTrigger } from "../../../store/reducers/mobile-modal-reducer";
import { EnergyInterface, tbResetHoverAction, tbSetHoverAction } from "../../../store/reducers/tb-reducer";
import { TbInfo } from "../../tb-info/TbInfo";
interface TbSinInterface {
    sin:string,
    energy:EnergyInterface
}
export const TbSin:React.FC <TbSinInterface> = ({sin,energy}) =>{
  
    const count = energy.energyListPresent[sin as keyof typeof energy.energyListPresent];
    const reqCount = energy.energyListReq[sin as keyof typeof energy.energyListReq];
    const tbHoverState = useTypedSelector(state => state.tbReducer).hover;
    const calcIndentity =(result:{visible: boolean ,pres:number , req:number},identity:IdentityInterface)=>{
        const {skillsSin} = identity;
        if(skillsSin[0] === sin){
            result.pres+=3;
            result.visible = true;
        }
        if(skillsSin[1] === sin){
            result.pres+=2;
            result.visible = true;
        }
        if (skillsSin[2] === sin){
            result.pres+=1;
            result.visible = true;
        }
        return result;
    }
    const calcEGO =(result:{visible: boolean ,pres:number , req:number},currEGO:EGOInterface)=>{
        const affinityReq = currEGO[sin as keyof typeof currEGO];
        result.req += affinityReq as number;
        if(affinityReq) result.visible = true;
        
        return result;
    }
    const slotHoverMatch = () => {
        let result = {visible: false ,pres: 0 , req:0};
        if(!tbHoverState) return result;
        if(tbHoverState.type === "slot"){
            const {ego,identity} = tbHoverState.trigger;
            if(identity)calcIndentity(result,identity);
            for(const key in ego){
                const currEGO = ego[key];
                if(currEGO ) calcEGO(result,currEGO);
            } 
        }
        else if (tbHoverState.type === "slot-identity"){
            if(tbHoverState.trigger)calcIndentity(result,tbHoverState.trigger);
        }else if (tbHoverState.type === "slot-ego"){
            if(tbHoverState.trigger)calcEGO(result,tbHoverState.trigger);
        }
        return result;
    }
    const refItem = useRef(null);
    const dispatch = useDispatch();
    const isHovering = useHover(refItem);
    const slotHoverInfo = slotHoverMatch();
   
    useEffect(()=>{
        if(isHovering) tbSetHoverAction(dispatch,{type:"sin",trigger:sin});
        return ()=> {
            tbResetHoverAction(dispatch);
        } 
    },[isHovering]) 
    const HoverComponent = <TbInfo attribure={sin}  type="sins"></TbInfo>
    const handleClick = () => {
        if(window.innerWidth > mobileLayoutFrom) return;
        if(reqCount !== 0 || count !== 0 ) setMobileModalTrigger(dispatch,HoverComponent);
        
    }
    return(
    <div ref={refItem} onClick={()=>handleClick()} className={["tb-sins-sin" , slotHoverInfo.visible ? "tb-sins-sin--active" : ""].join(" ")} key={sin}>
        { (reqCount !== 0 || count !== 0 ) && window.innerWidth > mobileLayoutFrom && HoverComponent}
        <img src={`${process.env.PUBLIC_URL}/images/sins/${sin}.webp`} className="tb-sins-img" alt={sin}/>
        <span>{count}{ (!!slotHoverInfo.pres) && <span className={"tb-sins-pres"} >{`(${slotHoverInfo.pres})`}</span>}/{reqCount}{ (!!slotHoverInfo.req) && <span className={"tb-sins-req"}>{`(${slotHoverInfo.req})`}</span>}</span>
    </div>
    )
}
