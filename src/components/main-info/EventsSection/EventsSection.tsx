import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { EventInterface } from "../../../store/reducers/events_list-reducer";
import { useQueryClient } from 'react-query';
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import "./EventsSection.css"

// Компонент EventSector
const EventSector: React.FC<{ event: EventInterface }> = ({ event }) => {
  const { t, i18n } = useTranslation();
  const [, setDate] = useState<null | Date>(null);
  const containerRef = useRef(null);
  const { isVisible } = useIntersectionObserver(containerRef, 0.1);

  const displayDateAndTimezone = () => {
    const currentDate = new Date();
    setDate(currentDate);
  };

  const handleTimeDifference = (
    startDate: Date | string | null | undefined,
    endDate: Date | string | null | undefined
  ) => {
    const currentDate = new Date();
    
    if (typeof startDate === 'string' && /^\d+$/.test(startDate)) {
      const baseDate = new Date('1900-01-01');
      baseDate.setDate(baseDate.getDate() - 1); // Уменьшить на 1 день
      baseDate.setHours(baseDate.getHours() - 20); // Уменьшить на 20 часов
      
      const parsedStartDate = new Date(baseDate.getTime() + parseInt(startDate) * 86400000);
      parsedStartDate.setHours(6, 0, 0); // Установить время на 06:00
      startDate = parsedStartDate;
    } else {
      const parsedStartDate = startDate ? new Date(startDate) : null;
      if (parsedStartDate) {
        parsedStartDate.setHours(6, 0, 0); // Установить время на 06:00
      }
      startDate = parsedStartDate;
    }
    
    
    if (typeof endDate === 'string' && /^\d+$/.test(endDate)) {
      const baseDate = new Date('1900-01-01');
      baseDate.setDate(baseDate.getDate() - 1); // Уменьшить на 1 день
      
      const parsedEndDate = new Date(baseDate.getTime() + parseInt(endDate) * 86400000);
      parsedEndDate.setHours(4, 0, 0); // Установить время на 04:00
      endDate = parsedEndDate;
    } else {
      const parsedEndDate = endDate ? new Date(endDate) : null;
      if (parsedEndDate) {
        parsedEndDate.setHours(4, 0, 0); // Установить время на 04:00
      }
      endDate = parsedEndDate;
    }
    
    if (!startDate) {
      return <span>{t("EventsSection.startDateUnknown")}</span>;
    }
    
    if (startDate > currentDate) {
      let difference = startDate.getTime() - currentDate.getTime();
      let info = t("EventsSection.eventStarts");
      
      return formatTimeDifference(difference, info);
    } else {
      // Если событие уже началось
      if (!endDate) {
        return <span>{t("EventsSection.endDateUnknown")}</span>;
      } else {
        let difference = endDate.getTime() - currentDate.getTime();
        let info = t("EventsSection.eventEnds");
        
        if (difference < 0) return <span>{t("EventsSection.eventEnded")}</span>;
        
        return formatTimeDifference(difference, info);
      }
    }
  };
  
  
  
  const formatTimeDifference = (difference: number, info: string) => {
    const millisecondsInOneDay = 86400000;
    const deltaDays = Math.trunc(difference / millisecondsInOneDay);
    const deltaHours = Math.trunc((difference % millisecondsInOneDay) / 3600000);
    const deltaMinutes = Math.trunc((difference % 3600000) / 60000);
    const deltaSeconds = Math.trunc((difference % 60000) / 1000);
  
    return (
      <span>
        {info}
        <br />
        {deltaDays + " " + t("EventsSection.d")}{" "}
        {deltaHours + " " + t("EventsSection.h")}{" "}
        {deltaMinutes + " " + t("EventsSection.m")}{" "}
        {deltaSeconds + " " + t("EventsSection.s")}
      </span>
    );
  };
  

  useEffect(() => {
    const timeInterval = setInterval(displayDateAndTimezone, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <article
      ref={containerRef}
      className={`event-sector ${isVisible ? "event-sector--animated" : ""}`}
    >
      {handleTimeDifference(event.startDate, event.endDate)}
      {
        i18n.language == "ru" && <a href={event.link} target="_blank" rel="noopener noreferrer">
          <div className="event-image-container-ru">
            <img src={event.imgSrc} alt={event.nameRu} />
          </div>
        </a>
      }
      {
        i18n.language == "en" && <div className="event-image-container-en">
          <img src={event.imgSrc} alt={event.nameEn} />
        </div>
      }
      {i18n.language == "ru" && (
        <p className="event-description">{t("EventsSection.description")}</p>
      )}
    </article>
  );
};

export const EventsSection: React.FC = () => {
  const events = useQueryClient().getQueryData<EventInterface[]>('events_list') || [];
  const { t } = useTranslation();
  return (
    <section className="events-section">
      <h2 className="new-entity">{t("EventsSection.header")}</h2>
      <div className="events-list-container">
        {events.map((event, index) => (
          <EventSector key={index} event={event} />
        ))}
      </div>
    </section>
  );
};

