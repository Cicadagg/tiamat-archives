import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { mobileLayoutFrom } from "../../constants/mobileLayoutFrom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { leftMenuChangeLayoutAction } from "../../store/reducers/left-menu-reducer";
import "./TopMenu.css";
export const TopMenu = () =>{
    const dispatch = useDispatch();
    const location = useLocation();
    useEffect(()=>{
        if(window.innerWidth <= mobileLayoutFrom) leftMenuChangeLayoutAction(dispatch,true);
    },[location]);

    const [hasRendered, setHasRendered] = useState(false);
    useEffect(() => {
        setHasRendered(true); 
    }, []); 
    const isMenuExpanded = useTypedSelector(store => store.leftMenuReducer);
    return <div className={`${hasRendered ? '' : 'first-render'} top-menu`}>
        <button onClick={()=>leftMenuChangeLayoutAction(dispatch,!isMenuExpanded)} className={`humburger-menu ${!isMenuExpanded && "humburger-menu--expanded"}`}>
            <div className="line"/>
        </button>
        <Link to="/"><span className="website-title"> GREAT &#x20;<span> LIMBUS </span>LIBRARY</span></Link>
    </div>
}