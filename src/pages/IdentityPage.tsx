import React from "react";
import { EntityFullInfoIdentityMain } from "../components/entity-full-info/EntityFullInfoIdentityMain";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент

export const IdentityPage:React.FC = () => {
   
    return <CommonPageLayout>
        <Analytics /> {/* Вставляем компонент для GA */}
            <LoadingPageWrapper queryKeys={["identities","statuses"]}>
                <EntityFullInfoIdentityMain />
            </LoadingPageWrapper>
    </CommonPageLayout> 
}
