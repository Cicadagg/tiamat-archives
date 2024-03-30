import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import ErrorBoundary from "../error-boundary/ErrorBoundary";
import { ErrorInfo } from "../error-info/ErrorInfo";
import "./MainLayoutContainer.css"
export const MainLayoutContainer:React.FC<{children:ReactNode|ReactNode[]}> = ({children})=>{
    const leftMenuState = useTypedSelector(store => store.leftMenuReducer);
    const {t,i18n} = useTranslation();

    return <main className={`main-layout-container ${leftMenuState && "main-layout-container--minimized"}`}>
        <ErrorBoundary fallbackComponent={<ErrorInfo error={t("MainLayoutContainer.ErrorBoundary.ErrorInfo")}/>}>
        {children}
        </ErrorBoundary>
    </main>
}