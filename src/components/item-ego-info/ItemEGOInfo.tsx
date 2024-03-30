import React from "react";
import { sinTypes } from "../../constants/skillBasedTypes";
import { EGOInterface } from "../../store/reducers/ego-reducer";
import "./ItemEGOInfo.css";
interface ItemEGOInfoInterface{
    entity:EGOInterface;
}
export const ItemEGOInfo:React.FC<ItemEGOInfoInterface> = ({entity}) => {
    const {egoTier,sanity,dmgType,egoSin} = entity;
    return (
        <div  className={`item-ego-info-container`} >
             <div className={"item-ego-info-skills"}>
                <div className="item-ego-info-sin">
                    <img src={`${process.env.PUBLIC_URL}/images/general/sanity.webp`} alt="sanity"/>
                    {sanity[0]}
                </div>
                {
                    dmgType.map((dt,index) =>{
                        return  <div  key={index} className="item-ego-info-sin">
                        <img src={`${process.env.PUBLIC_URL}/images/dmg-type/${dt}.png`} alt={dt}/>
                        <div className={`item-ego-info-line ${egoSin}-sin-color`}/>
                    </div>
                    })
                }
               
           </div>

            <div className={"item-ego-info-skills"}>
                {sinTypes.map((sin)=>{
                    if(!entity[sin]) return null
                    return (
                        <div key={`${sin}`} className="item-ego-info-sin">
                            <img src={`${process.env.PUBLIC_URL}/images/sins/${sin}.png`} alt={sin}/>
                            {"x"+entity[sin]}
                            <div className={["item-ego-info-line", `${sin}-sin-color`].join(" ")}/>
                        </div>
                    )
                })}
           </div>
          
           <span className={["item-ego-info-tier-rank", `item-ego-info-tier-rank--${egoTier}`].join(" ")} >{egoTier}</span>
            <div className={"item-ego-info-arrow"}/>
        </div>
    )
}