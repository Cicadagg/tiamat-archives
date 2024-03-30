import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DisclaimerBanner } from "../components/disclaimer-banner/DisclaimerBanner";
import { LanguageDisclaimer } from "../components/language-disclaimer/LanguageDisclaimer";
import { LeftMenu } from "../components/left-menu/LeftMenu";
import { MainLayoutContainer } from "../components/main-layout-container/MainLayoutContainer";
import { MobileInfoModal } from "../components/mobile-info-modal/MobileInfoModal";
import { ScrollUpButton } from "../components/scroll-up-button/ScrollUpButton";
import { TbModal } from "../components/tb-modal/TbModal";
import { TopMenu } from "../components/top-menu/TopMenu";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { tbCloseModalAction } from "../store/reducers/tb-reducer";
import { SEOHelmet } from "./SEOHelmet";

interface ICommonPageLayout {
    children:ReactNode|ReactNode[],
}
export const CommonPageLayout:React.FC<ICommonPageLayout> = ({children}) => {
    const {modalTrigger} = useTypedSelector(store => store.tbReducer);
    const dispatch = useDispatch();
    return  <>
        <TopMenu/>
        <LeftMenu/>
        <DisclaimerBanner/>
        <ScrollUpButton/>
        <MobileInfoModal/>
        <TbModal active={modalTrigger !== null} modalTrigger={modalTrigger} closer={() => tbCloseModalAction(dispatch)}/>
        <MainLayoutContainer>
            
            {children}
        </MainLayoutContainer>
    </>
}
