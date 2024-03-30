import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";



export const TierListPageRedirect:React.FC = () => {
    const param = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(`/${param["lang"] || "en"}/tierlist/identities`);
    },[])
    return null;
}
