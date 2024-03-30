import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { mobileLayoutFrom } from "../../constants/mobileLayoutFrom";
import useHover from "../../hooks/useHover";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { tbResetAllAction, tbAddSlotAction, tbRemoveSlotAction, tbSetSlotsAction, SlotInterface} from "../../store/reducers/tb-reducer";
import { ArrowLeftSVG } from "../svg/ArrowLeft";
import { ArrowRightSVG } from "../svg/ArrowRight";
import { XMarkSVG } from "../svg/XMark";
import { Toggle } from "../toggle/Toggle";
import { TbSlot } from "./tb-slot/TbSlot";
import "./TbSlots.css";

type LayoutType = "grid" | "line";

export const TbSlots = () =>{
    const {slots} = useTypedSelector(store => store.tbReducer);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const getStoredLayout = () => {
        const storedLayout = localStorage.getItem("tb-layout") || "line" ;
        return storedLayout as LayoutType;
    }
    const [layout , setLayout] = useState<LayoutType>(getStoredLayout());
    const [animatedClass , setAnimatedClass] = useState(getStoredLayout() === "line" ? "tb-slots-container--flex" : "tb-slots-container--grid");
    const [timeoutId, setTimeoutId] = useState<null|NodeJS.Timeout>(null);
    const isHovering = useHover(containerRef);
    const handleScrollLeft = () => {
        if (containerRef && containerRef.current) {
            const currentScroll = containerRef.current.scrollLeft;
            const targetScroll = currentScroll - 280;
            containerRef.current.scrollTo({
              left: targetScroll,
              behavior: "smooth", 
            });
          }
    };
    const handleScrollRight = () => {
        if (containerRef && containerRef.current) {
            const currentScroll = containerRef.current.scrollLeft;
            const targetScroll = currentScroll + 280;
            containerRef.current.scrollTo({
              left: targetScroll,
              behavior: "smooth", 
            });
          }
    };
    const handleLayoutChange = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setAnimatedClass(`${animatedClass} hidden`);
        const newTimeoutId = setTimeout(() => {
            if(layout === "grid") setAnimatedClass("tb-slots-container--flex"); 
            else setAnimatedClass("tb-slots-container--grid"); 
        }, 500);

        setTimeoutId(newTimeoutId);

        const newLayout = layout === "grid" ? "line" : "grid";
        setLayout(newLayout);
        localStorage.setItem("tb-layout",newLayout)
    } 
    const handleSlotAdd = () => {
        if(slots.length < 12) tbAddSlotAction(dispatch);
    }
    const handleSlotRemove = () =>{
        if(slots.length > 5) tbRemoveSlotAction(dispatch);
    } 
   const handleMouseWheel = (e: React.WheelEvent) => {
        const container = containerRef.current;
        if (container) {
            container.scrollLeft += e.deltaY;
        }
    };

    useEffect(() => {
        if (window.innerWidth <= mobileLayoutFrom || layout === "grid") return;
      
        const mainElements = document.getElementsByTagName('main');
        const currentScrollDepth = window.scrollY;
      
        if (isHovering ) {
          const mainElementsArray = Array.from(mainElements);
          for (const mainElement of mainElementsArray) {
            mainElement.style.position = 'fixed';
            mainElement.dataset.scrollY = mainElement.dataset.scrollY || `${currentScrollDepth}`;
            mainElement.style.top = `-${mainElement.dataset.scrollY}px`;
          }
        } else {
          const mainElementsArray = Array.from(mainElements);
          for (const mainElement of mainElementsArray) {
            mainElement.style.position = 'unset';
            mainElement.style.top = '0';
            const savedScrollY = parseFloat(mainElement.dataset.scrollY || "0") ;
            window.scrollTo(0, savedScrollY);
            mainElement.dataset.scrollY = '';
          }
        }
      }, [isHovering]);

    useEffect(() => {
        const storedSlots = localStorage.getItem("tb-stored-slots");
        if(storedSlots){
            const parsedSlots = JSON.parse(storedSlots) as SlotInterface[];
            if(Array.isArray(parsedSlots)){
                tbSetSlotsAction(dispatch,{slots:parsedSlots});
            }
        }
    }, []);

    return (
        <section className="tb-slots"
        onScroll={(e)=>e.preventDefault()} 
        onWheel={(e)=>{e.preventDefault();e.stopPropagation()}}>
            <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between",alignItems:"center"}}>
                <div className={"tb-slots-collapse-wrapper"} style={{display:"flex", gap:"10px"}}> 
                    <span className="tb-slots-btnSlotText">{t("TbSlots.slotsCount")}</span>
                    <div className="tb-slots-btnSlotCount">
                        <button style={{color:"white"}}onClick={handleSlotRemove}>−</button>
                        <span>{slots.length}</span>
                        <button style={{color:"white"}}onClick={handleSlotAdd}>+</button>
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"row", gap:"10px"}}>
                    <Toggle positionClass="tb-slots-toggle" click={handleLayoutChange}/>
                    <button className="tb-slots-reset" onClick={()=> tbResetAllAction(dispatch) }><XMarkSVG/> {t("TbSlots.reset")}</button>
                </div>
            </div>
                <button aria-label="slide left" className={`tb-slots-btnLeft ${(animatedClass.includes("hidden") || layout==="grid") ? "hidden": ""}`} onClick={handleScrollLeft}><ArrowLeftSVG/></button>
                <button aria-label="slide right" className={`tb-slots-btnRight ${(animatedClass.includes("hidden") || layout==="grid") ? "hidden": ""}`} onClick={handleScrollRight}><ArrowRightSVG/></button>
            
            <div className={["tb-slots-container", animatedClass, (isHovering && layout==="line") &&  "tb-slots-container--gloving"].join(" ")} 
                 ref={containerRef}
                 onWheel={(e)=>handleMouseWheel(e)}
                >
                    {slots.map((slot,index)=>{
                        return(
                            <TbSlot slot={slot} index={index} key={"id"+index}></TbSlot>
                        )
                    })}
            </div>

        </section>
    )
}
