import React from "react";
import { EntityFullInfoEGOMain } from "../components/entity-full-info/EntityFullInfoEgoMain";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент

export const EGOPage:React.FC = () => {
    return <CommonPageLayout >
        <Analytics /> {/* Вставляем компонент для GA */}
    <LoadingPageWrapper queryKeys={["ego","statuses"]}>
        <EntityFullInfoEGOMain/>
    </LoadingPageWrapper>
</CommonPageLayout> 
}
