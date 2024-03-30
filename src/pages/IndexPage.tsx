import React from "react";
import { MainInfo } from "../components/main-info/MainInfo";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { SEOHelmet } from "./SEOHelmet";

export const IndexPage:React.FC = () => {
    return  <CommonPageLayout>
        <LoadingPageWrapper queryKeys={["ego","identities","statuses"]}>
            <SEOHelmet titleText={"Great Limbus Library"} descriptionText=""/>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAAPklEQVR42mL8/vYTCwMvYGVQCpIBG4C6O6bYAxkMAFUxkVUNAQUwUAwSQvJcU0kAAAAASUVORK5CYII=" alt="Base64 Image"/>

            <MainInfo/>
        </LoadingPageWrapper>
</CommonPageLayout> 
}
