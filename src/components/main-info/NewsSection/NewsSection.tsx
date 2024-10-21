import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { news } from "../../../constants/newsList";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import "./NewsSection.css"
interface INewsSector{
    news:{
        endDate:Date|undefined,nameEn:string,nameRu:string,imgSrc:string,descriptionRu?:string,descriptionEn?:string,link?:string
    }
}
const News:React.FC<INewsSector> = ({news}) =>{
    const { i18n } = useTranslation();
    const containerRef = useRef(null);
    const {isVisible} = useIntersectionObserver(containerRef,0.1);

    return (
        <article
          ref={containerRef}
          className={`news-sector ${isVisible ? "news-sector--animated" : ""}`}
        >
            <a href={news.link} target="_blank" rel="noopener noreferrer">
            <div className="news-image-container">
                <img src={news.imgSrc} alt={news.nameRu} />
            </div>
            </a>
            <p className="news-description">{ (i18n.language == "ru") ? news.descriptionRu : news.descriptionEn }</p>
        </article>
    );
}
export const NewsSection: React.FC = () => {
    const {t} = useTranslation();
    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        const endDate = new Date(news[0].endDate);
        const currentDate = new Date();
        if (currentDate > endDate) {
          setIsVisible(false);
        }
      }, [news[0].endDate]);
    
    
    return <section className="news-section" style={{ display: isVisible ? 'block' : 'none' }}>
        <h2>{t("NewsSection.header")}</h2>
        {news.map((news, index) => {
            return <News  key={index} news={news}/>
        })}
    </section>
}