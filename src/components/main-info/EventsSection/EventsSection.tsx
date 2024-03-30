import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { events } from "../../../constants/eventsList";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import "./EventsSection.css"
interface IEventSector{
    event:{
        startDate:Date|undefined ,endDate:Date|undefined,name:string,imgSrc:string
    }
}
const EventSector:React.FC<IEventSector> = ({event}) =>{
    const {t} = useTranslation();
    const [date,setDate] = useState<null|Date>(null);
    const containerRef = useRef(null);
    const {isVisible} = useIntersectionObserver(containerRef,0.1);
    const displayDateAndTimezone = () =>{
        const currentDate = new Date();
        setDate(currentDate)
    }
    const handleTimeDifference = (startDate:Date|undefined ,endDate:Date|undefined) =>{
        const currentDate = new Date();
        if (startDate === undefined) return <span> {t("EventsSection.startDateUnknown")}</span>

        let difference = startDate.getTime() - currentDate.getTime();
        let info =  t("EventsSection.eventStarts");
        if(difference <= 0){
            if (endDate === undefined) return <span> {t("EventsSection.endDateUnknown")}</span>
            
            difference = endDate.getTime() - currentDate.getTime();
            info = t("EventsSection.eventEnds");
        }
        const millisecondsInOneDay = 86_400_000;
        const deltaDays = difference/millisecondsInOneDay;
        const deltaHours = deltaDays%1*24;
        const deltaMinutes = deltaHours%1*60;
        const deltaSeconds = deltaMinutes%1*60;
        if (difference < 0) return <span> {t("EventsSection.eventEnded")}</span>
        return <span>
            {info} <br></br> {`${Math.trunc(deltaDays)} ${t("EventsSection.d")}. ${Math.trunc(deltaHours)} ${t("EventsSection.h")}. ${Math.trunc(deltaMinutes)} ${t("EventsSection.m")}. ${Math.trunc(deltaSeconds)} ${t("EventsSection.s")}.`} 
        </span>
    }

    useEffect(()=>{
        const timeInterval = setInterval(displayDateAndTimezone, 1000);
        return () => {
            clearInterval(timeInterval);
        }
    },[]);
    return <article ref={containerRef} className={`event-sector ${isVisible && "event-sector--animated"}`}>
        {handleTimeDifference(event.startDate, event.endDate)}
        <img src={event.imgSrc} alt={event.name} />
    </article>
}
export const EventsSection: React.FC = () => {
    const {t} = useTranslation();
    return <section className="events-section">
        <h2> {t("EventsSection.header")} </h2>
        {events.map((event, index) => {
            return <EventSector  key={index} event={event}/>
        })}
    </section>
}