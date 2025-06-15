import React, { useEffect, useState } from "react"
import { ArrowUpSVG } from "../svg/ArrowUp";
import "./ScrollUpButton.css";

export const ScrollUpButton:React.FC = () =>{
    const [isArrowVisible,setIsArrowVisible] = useState(false);
    useEffect(()=>{
        const handleScroll = () => {
            if (window.scrollY >= 100)setIsArrowVisible(true);
            else setIsArrowVisible(false);
          };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

      },[])
    return <button aria-label="Scroll to Top" className={`scroll-up-button ${isArrowVisible && "scroll-up-button--visible"}`} onClick={ ()=>window.scrollTo({top: 0,behavior: 'smooth'}) }>
       <ArrowUpSVG/>
    </button>
}