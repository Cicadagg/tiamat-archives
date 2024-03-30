import React from "react";
import { EntityFullInfoIdentityMain } from "../components/entity-full-info/EntityFullInfoIdentityMain";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";

export const IdentityPage:React.FC = () => {
   
    return <CommonPageLayout>
            <LoadingPageWrapper queryKeys={["identities","statuses"]}>

                <EntityFullInfoIdentityMain />
            </LoadingPageWrapper>
    </CommonPageLayout> 
}
