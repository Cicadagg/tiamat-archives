import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SlotInterface } from "../../store/reducers/tb-reducer";
import { IdentitySVG } from "../svg/IdentitySVG";
import { EyeOpenedSVG } from "../svg/EyeOpenedSVG";
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

const ModalSlot:React.FC<{modalTrigger:SlotInterface|null, closer: Function}> = ({modalTrigger, closer}) =>{
    const { i18n, t } = useTranslation();
    
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
            glyph:"ט",
        },
        {
            ego:HE,
            glyph:"ה",
        },
        {
            ego:WAW,
            glyph:"ו",
        },
        {
            ego:ALEPH,
            glyph:"ℵ",
        },
    ];
    return(
        <>
            { (!identity) ? 
                <div className="modal-identity modal-empty">
                    <IdentitySVG/>
                </div> 
                : 
                <Link 
                    to={`/${i18n.language}/identities/${identity.imgUrl}`} 
                    className="modal-identity shadow"
                    onClick={() => closer()}
                >
                    <img src={`${process.env.PUBLIC_URL}/images/identities/${identity.imgUrl}.webp`} alt={`identities/${identity.imgUrl}`}/>
                    <div className="modal-identity-shadow" />
                    <div className={`modal-info`}>{t('GiftItem.info')}</div>
                </Link>
            }
            <div className="modal-ego-container" >
                {egosMap.map(({ego,glyph},index)=>{
                    return(
                        <>
                            { ego ? 
                                <Link 
                                    to={`/${i18n.language}/ego/${ego.imgUrl}`}
                                    className="modal-ego shadow"
                                    onClick={() => closer()}
                                >                                    
                                    <img src={`${process.env.PUBLIC_URL}/images/ego/${ego.imgUrl}.webp`} alt={`ego/${ego.imgUrl}`}/>
                                    <div className="modal-ego-shadow"/>
                                    <div className={`modal-info`}><EyeOpenedSVG/></div>
                                    {ego && <div className={["modal-ego-frame",`${ego.egoSin}-sin-color`].join(" ")}/>}
                                </Link>
                            : <div className={["modal-ego" , (!ego) ? "modal-empty": "shadow" ].join(" ") } key={`ego${index}`} >
                                <span>{glyph}</span>
                            </div>
                            }
                        </>
                    )
                })}
            </div>
        </>
    )
}

export const TbModal: React.FC<ModalProps>  = ({active , modalTrigger, closer}) => { 
    return (
        <div className={["modal" , (active) ? "modal--active": "" ].join(" ") } onClick={()=>{ if(closer) closer() }}>
            <div className="modal__slot" onClick={ (e)=>{ e.stopPropagation()}}>
                <ModalSlot modalTrigger={modalTrigger} closer={closer}/>
            </div>
            <div className="modal__content " onClick={ (e)=>{ e.stopPropagation()}}>
                <ModalContent modalTrigger={modalTrigger}/>
            </div>
        </div>
    )
}