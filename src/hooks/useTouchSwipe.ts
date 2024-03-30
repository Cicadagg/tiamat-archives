import React, { useCallback, useEffect, useState } from "react";
import { mobileLayoutFrom } from "../constants/mobileLayoutFrom";
type TTouch = { 
    isStarted:boolean , 
    isThresholdMetHide:boolean,
    isThresholdMetExpand:boolean,
    isSwipe:boolean,
    startX:number , 
    currentX:number, 
    currentOffsetX:number,
    startY:number , 
    currentY:number, 
    currentOffsetY:number,
    startTime:number
};
export const useTouchSwipe = (threshold:number) =>{
    const swipeThresholdTime = 500;
    const [touch, setTouch] = useState<TTouch>(
        { 
            isStarted: false, 
            isThresholdMetHide: false, 
            isThresholdMetExpand: false, 
            isSwipe: false, 
            startX: 0, 
            currentX: 0 ,
            currentOffsetX:0,
            startTime: Date.now(),
            startY:0 , 
            currentY:0, 
            currentOffsetY:0,

        }
    );

    const onTouchStart = useCallback((e: TouchEvent) => {
        if (touch.isStarted) return;
        const currentTouchX = e.touches[0].clientX;
        const currentTouchY = e.touches[0].clientY;
        setTouch(prevTouch => ({
            ...prevTouch,
            isStarted: true,
            startX: currentTouchX,
            currentX: currentTouchX,
            startY:currentTouchY , 
            currentY:currentTouchY, 
            isSwipe: false,
            startTime: Date.now(),
        }));
    }, [touch]);
    
    const onTouchMove = useCallback((e: TouchEvent) => {
        if (!touch.isStarted) return;
        const currentTouchX = e.touches[0].clientX;
        const currentTouchY = e.touches[0].clientY;
        const elapsedTime = Date.now() - touch.startTime;
        if (Math.abs(currentTouchX - touch.currentX) < 1.5)return;
        if (Math.abs(touch.currentOffsetX ) > threshold) return onTouchEnd();
        if (Math.abs(touch.currentOffsetY ) > 10) return onTouchEnd();
        setTouch(prevTouch => ({
            ...prevTouch,
            currentX: currentTouchX,
            currentOffsetX: currentTouchX - prevTouch.startX,
            currentY: currentTouchY,
            currentOffsetY: currentTouchY - prevTouch.startY,
            isSwipe: elapsedTime < swipeThresholdTime,
        }));
    }, [touch]);
    
    const onTouchEnd = useCallback(() => {
        if (!touch.isStarted) return;
        setTouch(prevTouch =>(
            { 
                ...prevTouch,
                isStarted: false, 
                currentOffsetX:0,
                currentOffsetY:0,
                isThresholdMetExpand:(threshold < touch.currentOffsetX) ,
                isThresholdMetHide:(-threshold > touch.currentOffsetX) 

            }
        )
        );
      
    }, [touch]);
    useEffect(() => {
        if(window.innerWidth <= mobileLayoutFrom){
            window.addEventListener("touchstart", onTouchStart);
            window.addEventListener("touchmove", onTouchMove);
            window.addEventListener("touchend", onTouchEnd);
        
            return () => {
                window.removeEventListener("touchstart", onTouchStart);
                window.removeEventListener("touchmove", onTouchMove);
                window.removeEventListener("touchend", onTouchEnd);
            }
        }
       
    }, [onTouchStart, onTouchMove, onTouchEnd]);

    return {
        offsetX: touch.currentOffsetX , 
        isStarted: touch.isStarted ,
        isThresholdMetHide:touch.isThresholdMetHide , 
        isThresholdMetExpand:touch.isThresholdMetExpand,
        isSwipe:touch.isSwipe

    }
}