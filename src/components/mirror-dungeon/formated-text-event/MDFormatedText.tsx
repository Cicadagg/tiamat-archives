import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchChangeValueAction } from '../../../store/reducers/search-reducer';
import { MDEvent } from '../../../types/md-event-interface';
import './MDFormatedText.css';

export const MDFormatedTextEvent:React.FC<{eventID:string}> = ({eventID}) => {
    const {i18n} = useTranslation();
    const events = useQueryClient().getQueryData("md-events") as MDEvent[]|null;
    const event = events?.find(e => e.id === eventID);
    if(!event) return null;
    const name = i18n.language === "ru" ? event.abnoRU :event.abnoEN;
    
    return (
        <Link 
            to={`/${i18n.language}/mirror-dungeon/events?id=${event.id}`} 
            className="MDFormatedText-event"
            >
                <span className="formated-wrapper">
                    <img 
                    className='small-img'
                    src={`${process.env.PUBLIC_URL}/images/md-events/${event.id}.webp`} 
                    alt={name}/>
                        <img 
                        className='big-img'
                        src={`${process.env.PUBLIC_URL}/images/md-events/${event.id}.webp`} 
                        alt={name}/>
                    
                    <span>{name}</span>
                </span>
        </Link>
    );
};