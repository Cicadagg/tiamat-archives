import React from "react";
import { TestComponentMDOption } from "../components/test-component-event/TestComponent";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";

export const EventTestPage:React.FC = () => {
    return <CommonPageLayout>
    <LoadingPageWrapper queryKeys={["md-events","md-gifts","statuses"]}>
        <TestComponentMDOption/>
    </LoadingPageWrapper>
</CommonPageLayout> 
}
