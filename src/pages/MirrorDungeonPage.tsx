import React, { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CommonPageLayout } from "./CommonPageLayout";
import { LoadingPageWrapper } from "./LoadingPageWrapper";
import { useTranslation } from "react-i18next";
import { H1Component } from "../components/h1-component/H1Component";
import { SEOHelmet } from "./SEOHelmet";
import { MirrorDungeonNav } from "../components/mirror-dungeon/nav/TierListNav";
import { MDRouteHandler } from "../components/mirror-dungeon/route-type-handler/MDRouteHandler";

export const MirrorDungeonPage:React.FC = () => {
    const {i18n} = useTranslation();
    const params = useParams();
    const type = params['type'] || "redirect";
    const navigate = useNavigate();
    useEffect(()=>{
        if( !(["rest-stops","gifts","events"].includes(type)))  
        navigate(`/${i18n.language}/mirror-dungeon/events`);
    },[])
    const queryKeys = ["md-gifts","md-events","statuses"];
    const {t} = useTranslation();
    return <CommonPageLayout>
            <LoadingPageWrapper queryKeys={queryKeys}>
                <H1Component header={t("MirrorDungeonPage.header")}/>
                <MirrorDungeonNav/>
                <MDRouteHandler/>
            </LoadingPageWrapper>
    </CommonPageLayout> 
}
