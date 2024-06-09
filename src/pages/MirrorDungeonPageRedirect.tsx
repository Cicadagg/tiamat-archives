import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const MirrorDungeonPageRedirect:React.FC = () => {
    const param = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        navigate(`/${param["lang"] || "en"}/mirror-dungeon/events`);
    },[])
    return null;
}
