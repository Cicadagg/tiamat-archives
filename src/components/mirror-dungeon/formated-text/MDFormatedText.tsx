import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { mdSelectGiftIdAction } from '../../../store/reducers/md-reducer';
import { MDGift } from '../../../types/md-gift-interface';
import './MDFormatedText.css';

export const MDFormatedText:React.FC<{text:string}> = ({text}) => {
    const {i18n} = useTranslation();
    const gifts = useQueryClient().getQueryData("md-gifts") as MDGift[]|null;
    
    const splitted_text =  text.split("#");
    const dispatch = useDispatch();
    const jsx:React.ReactNode[] = splitted_text.reduce((acc:React.ReactNode[],curr,index)=>{
        if(index%2 === 1){
            const gift = gifts?.find(g => g.id === curr);
            if(gift){
            const name = i18n.language === "ru" ? gift.nameRU :gift.nameEN;
            acc.push(<Link 
            to={`/${i18n.language}/mirror-dungeon/gifts`} 
            onClick={()=> mdSelectGiftIdAction(dispatch,gift.id)} 
            key={index}>
                <figure>
                    <img 
                    className='small-img'
                    src={`${process.env.PUBLIC_URL}/images/md-gifts/${gift.id}.webp`} 
                    alt={name}/>
                    <img 
                    className='big-img'
                    src={`${process.env.PUBLIC_URL}/images/md-gifts/${gift.id}.webp`} 
                    alt={name}/>
                    <figcaption className={`MDFormatedText--${(gift.id !== "gift_0") ? gift.sin : "none"}`}>{name}</figcaption>
                </figure>
            </Link>)
            }
        }else{
            acc.push(<React.Fragment key={index}>{curr}</React.Fragment>)
        }

        return acc;
    },[])
    return (
        <p 
        className='MDFormatedText'>
            {jsx}
        </p>
    );
};