import React from 'react';
import { Filters } from '../../filters/Filters';
import { GiftsHeader } from './header/GiftsHeader';
import { GiftsList } from './list/GiftsList';
import './MDGifts.css';

export const MDGifts:React.FC = () => {
    
  return (
    <>
    <Filters/>
    <div className='MDGifts-wrapper'>
        <GiftsHeader/>
        <GiftsList/>
    </div>
    </>
  );
};