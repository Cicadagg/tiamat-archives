import React from "react";
import { TestComponentMDOption } from "../components/test-component-event/TestComponent";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import Analytics from "../components/Analytics"; // Импортируем ваш компонент

export const EventTestPage:React.FC = () => {
    return <CommonPageLayout>
        <Analytics /> {/* Вставляем компонент для GA */}
    <LoadingPageWrapper queryKeys={["md-events","md-gifts","statuses"]}>
        <TestComponentMDOption/>
    </LoadingPageWrapper>
</CommonPageLayout> 
}
