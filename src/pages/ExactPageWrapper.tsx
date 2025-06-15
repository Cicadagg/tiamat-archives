import React, {useLayoutEffect} from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
interface IExactPageWrapperProps {
    children:React.ReactElement,
    path:string
}
export const ExactPageWrapper:React.FC<IExactPageWrapperProps> = ({children,path}) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const storedLanguage = localStorage.getItem("i18nextLng");
    const {i18n} = useTranslation();

    useLayoutEffect(()=>{
        const currPathArr = pathname.split("/");
        if(currPathArr.length !== path.split("/").length){
            if(pathname.at(-1) === "/")
            navigate(pathname.substring(0,pathname.length-1));
            else{
                i18n.changeLanguage(storedLanguage || "en");
                navigate(`/${storedLanguage || "en"}/`);
                // navigate(`/`);
            }
        } 
    },[])
    return children;
}
