import React from 'react';
import { MDCrafts } from './crafts/MDCrafts';
import { MirrorDungeonDisclaimer } from './disclaimer/MDDisclaimer';
import './MDRestStops.css';

export const MDRestStops:React.FC = () => {
  return (
    <>
    <MirrorDungeonDisclaimer/>
    <div className='MDRestStops-wrapper'>
        <MDCrafts/>
    </div>
    </>
  );
};