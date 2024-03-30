import React from "react";
import { SlotInterface } from "../../store/reducers/tb-reducer";
import { IdentitySVG } from "../svg/IdentitySVG";
import { TbList } from "../tb-list/TbList";
import "./TbModal.css";
interface ModalProps {
    modalTrigger: SlotInterface|null;
    active: boolean,
    closer: Function;
}
const  ModalContent:React.FC<{modalTrigger:SlotInterface|null}> = ({modalTrigger}) =>{
    if(!modalTrigger) return <></>;
    return <TbList/>
 }

const ModalSlot:React.FC<{modalTrigger:SlotInterface|null}> = ({modalTrigger}) =>{
    if(!modalTrigger) return <></>;
    const {ego,identity} = modalTrigger;
    const {ZAYIN,ALEPH,HE,TETH,WAW} = ego;
    const egosMap = [
        {
            ego:ZAYIN,
            glyph:"ז",
        },
        {
            ego:TETH,
            glyph:"ו",
        },
        {
            ego:HE,
            glyph:"ה",
        },
        {
            ego:WAW,
            glyph:"ℵ",
        },
        {
            ego:ALEPH,
            glyph:"ט",
        },
    ];
    return(
        <>
            <div className={["modal-identity" , (!identity) ? "modal-empty": "shadow" ].join(" ") }>
            { (!identity) ? <IdentitySVG/>:<img src={`${process.env.PUBLIC_URL}/images/identities/${identity.imgUrl}.webp`} alt={`identities/${identity.imgUrl}`}/>}
            </div>
            <div className="modal-ego-container" >
                {egosMap.map(({ego,glyph},index)=>{
                    return(
                        <div className={["modal-ego" , (!ego) ? "modal-empty": "shadow" ].join(" ") } key={`ego${index}`} >
                            {ego ? <img src={`${process.env.PUBLIC_URL}/images/ego/${ego.imgUrl}.webp`} alt={`ego/${ego.imgUrl}`}/> : <span>{glyph}</span>}
                            {ego && <div className={["modal-ego-frame",`${ego.egoSin}-sin-color`].join(" ")}/>}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export const TbModal: React.FC<ModalProps>  = ({active , modalTrigger,closer}) => { 
    return (
        <div className={["modal" , (active) ? "modal--active": "" ].join(" ") } onClick={()=>{ if(closer) closer() }}>
            <div className="modal__slot" onClick={ (e)=>{ e.stopPropagation()}}>
                <ModalSlot modalTrigger={modalTrigger}/>
            </div>
            <div className="modal__content " onClick={ (e)=>{ e.stopPropagation()}}>
                <ModalContent modalTrigger={modalTrigger}/>
            </div>
        </div>
    )
}

