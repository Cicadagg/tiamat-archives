import React, { useRef} from 'react';
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import "./ListSinnerBar.css";
interface IListSinnerBarProps {
    data:React.ReactNode[];
    sinner:string
}

export const ListSinnerBar:React.FC<IListSinnerBarProps> = ({data,sinner}) => {
   const ref = useRef(null);
   const {isVisible} = useIntersectionObserver(ref,0.15);
   const {t} = useTranslation();
  return (
    <section ref={ref} className='ListSinnerBar'>
        <header>
            {
                sinner === "new" 
                ? <div className={`sinner-default-new  ${isVisible && "sinner-default-new--animated"}`}>{t("sinners.new").toUpperCase()}</div>
                : <img className={`sinner-default-img  ${isVisible && "sinner-default-img--animated"}`} src={`${process.env.PUBLIC_URL}/images/sinners-default/${sinner}.webp`}/>
                
            }
            <h2  className={`sinner-default-header ${isVisible && "sinner-default-header--animated"}`}>{t(`sinners.${sinner.replace(" ","")}`)} ({data.length})</h2>
        </header>
        <div className={"ListSinnerBar-contentWrapper"}>
            <div className={"ListSinnerBar-content"} >
                {data}
            </div>  
        </div>
        
    </section>
  );
};