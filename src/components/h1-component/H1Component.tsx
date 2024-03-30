
import React from 'react';
import { LanguageDisclaimer } from '../language-disclaimer/LanguageDisclaimer';
import "./H1Component.css"

interface IH1ComponentProps {
    header:string
}

export const H1Component:React.FC<IH1ComponentProps> = ({header}) => {
  return (
    <div className='H1Component'>
        <h1>{header}</h1>
        <LanguageDisclaimer/>
    </div>
  );
};