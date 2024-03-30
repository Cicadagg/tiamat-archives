import React, { useState } from "react";
import { GridSVG } from "../svg/GridSVG";
import { LineSVG } from "../svg/LineSVG";
import "./Toggle.css";

export const Toggle: React.FC<{click:Function,positionClass:string}> = ({click,positionClass}) => { 
    const [isChecked, setIsChecked] = useState(
      (localStorage.getItem("tb-layout") || "line") === "grid"
    ); 

  const handleChange = () => {
    setIsChecked(!isChecked);
    click(); 
  };

  return (
    <div className={`${positionClass}`}>
        <label className={`toggle`}>
            <input aria-label="toggle team builder layout" type="checkbox" checked={isChecked} onChange={handleChange} />
            <div className="toggle-slider">
                <span className={`status-text ${isChecked ? 'on' : 'off'} `}>
                    {!isChecked ? <LineSVG/> : <GridSVG/>}
                </span>
            </div>
        </label>
    </div>
  );
}


