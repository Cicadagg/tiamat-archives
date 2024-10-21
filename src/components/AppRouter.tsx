import {Routes , Route,BrowserRouter as Router, useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import { IndexPage } from "../pages/IndexPage";
import { TierListPage } from "../pages/TierListPage";
import { EGOsPage } from "../pages/EGOsPage";
import { IdentitiesPage } from "../pages/IdentitiesPage";
import { TeamBuilderPage } from "../pages/TeamBuiderPage";
import { StatusesPage } from "../pages/StatusesPage";
import { useDispatch } from "react-redux";
import { filterResetAllAction } from "../store/reducers/filter-reducer";
import { AboutGamePage } from "../pages/AboutGamePage";
import { ContactPage } from "../pages/ContactPage";
import { searchChangeValueAction } from "../store/reducers/search-reducer";
import { IdentityPage } from "../pages/IdentityPage";
import { ExactPageWrapper } from "../pages/ExactPageWrapper";
import { EGOPage } from "../pages/EGOPage";
import { AdminPage } from "../pages/AdminPage";
import { TierListPageRedirect } from "../pages/TierListPageRedirect";
import { GraditudePage } from "../pages/GraditudePage";
import { MirrorDungeonPage } from "../pages/MirrorDungeonPage";
import { MirrorDungeonPageRedirect } from "../pages/MirrorDungeonPageRedirect";
import { EventTestPage } from "../pages/EventTestPage";
import { GuidesPage } from "../pages/GuidesPage";

export const AppRouter:React.FC = () => {
    
    const routes = [
        {
            path:"/",
            element:<IndexPage />,
            isExact:true,
        },
        {
            path:"/test/description",
            element:<AdminPage />,
            isExact:false,
        },
        {
            path:"/test/event",
            element:<EventTestPage />,
            isExact:false,
        },
        {
            path:"/tierlist",
            element:<TierListPageRedirect />,
            isExact:false,
        },
        {
            path:"/tierlist/:type",
            element:<TierListPage />,
            isExact:true,
        },
        {
            path:"/ego",
            element:<EGOsPage />,
            isExact:true,
        },
        {
            path:"/ego/:egoId",
            element:<EGOPage />,
            isExact:true,
        },
        {
            path:"/identities",
            element:<IdentitiesPage />,
            isExact:true,
        },
        {
            path:"/guides",
            element:<GuidesPage />,
            isExact:true,
        },
        {
            path:"/identities/:identityId",
            element:<IdentityPage />,
            isExact:true,
        },
        {
            path:"/teambuilder",
            element:<TeamBuilderPage />,
            isExact:true,
        },
        {
            path:"/statuses",
            element:<StatusesPage />,
            isExact:true,
        },
        {
            path:"/aboutgame",
            element:<AboutGamePage />,
            isExact:true,
        },
        {
            path:"/contact",
            element:<ContactPage />,
            isExact:true,
        },
        {
            path:"/graditude",
            element:<GraditudePage />,
            isExact:true,
        },
        {
            path:"/mirror-dungeon/:type",
            element:<MirrorDungeonPage />,
            isExact:true,
        },
        {
            path:"/mirror-dungeon",
            element:<MirrorDungeonPageRedirect />,
            isExact:false,
        },
    ]
    const dispatch = useDispatch();
    const location = useLocation();
     useEffect(()=>{
        window.scrollTo(0, 0);
        filterResetAllAction(dispatch);
        searchChangeValueAction(dispatch,"");
    },[location])

    return (
        <Routes>
        <Route path={`/`}  element={<IndexPage/>} />
        {
        routes.map((route,index)=>{
            const {path,isExact} = route;
            let {element} = route;
            if(isExact) element = <ExactPageWrapper path={`/:lang${path}`}>
                {element}
            </ExactPageWrapper>
            return <Route key={index} path={`/:lang${path}`}  element={element} />
        })
        }
        </Routes>
    )
}
