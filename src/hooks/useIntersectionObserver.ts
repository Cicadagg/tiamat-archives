import React, { useEffect, useState } from "react";

export const useIntersectionObserver = (containerRef:React.MutableRefObject<null|HTMLElement> , threshold:number) =>{
    const [ isVisible, setIsVisible ] = useState(false);
    const callbackFunction = (entries:any) => {
            const [ entry ] = entries
            setIsVisible(entry.isIntersecting)
    }
    const options = {
            root: null,
            rootMargin: "0px",
            threshold
    }
    const observer = new IntersectionObserver(callbackFunction, options);

    useEffect(() => {
            if(containerRef.current && isVisible) observer.unobserve(containerRef.current);
            else if (containerRef.current) observer.observe(containerRef.current)
            return () => {
                if(containerRef.current) observer.unobserve(containerRef.current)
            }
    }, [containerRef, options,isVisible])

    return {isVisible}
}