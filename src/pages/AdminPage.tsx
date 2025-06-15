import React from "react";
import { TestComponent } from "../components/test-component/TestComponent";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";

export const AdminPage:React.FC = () => {
    return <CommonPageLayout>
    <LoadingPageWrapper queryKeys={["ego","identities","statuses"]}>
        <TestComponent/>
    </LoadingPageWrapper>
</CommonPageLayout> 
}
