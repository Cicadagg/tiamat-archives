import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { setMobileModalTrigger } from "../../store/reducers/mobile-modal-reducer";
import "./MobileInfoModal.css";

export const MobileInfoModal: React.FC  = () => { 
   const dispatch = useDispatch();
   const {trigger} = useTypedSelector(store => store.mobileModalReducer);
    return (
        <div className={["mobile-info-modal" , (trigger) ? "mobile-info-modal--active": "" ].join(" ") } onClick={()=>{ setMobileModalTrigger(dispatch,null) }}>
            <div className="mobile-info-modal__content " onClick={ (e)=>{ e.stopPropagation()}}>
                {trigger}
            </div>
        </div>
    )
}

