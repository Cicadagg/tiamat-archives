import React from "react";
import { EntityFullInfoEGOMain } from "../components/entity-full-info/EntityFullInfoEgoMain";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";

export const EGOPage:React.FC = () => {
    return <CommonPageLayout >
    <LoadingPageWrapper queryKeys={["ego","statuses"]}>
        <EntityFullInfoEGOMain/>
    </LoadingPageWrapper>
</CommonPageLayout> 
}
