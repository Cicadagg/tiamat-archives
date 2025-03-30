import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { NewsInterface } from "../../../store/reducers/news_list-reducers";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import { useQueryClient } from "react-query";
import "./NewsSection.css";

const News: React.FC<{ news: NewsInterface }> = ({ news }) => {
    const { t } = useTranslation();
    const containerRef = useRef(null);
    const {isVisible} = useIntersectionObserver(containerRef,0.1);
  return (
        <article
          ref={containerRef}
          className={`news-sector ${isVisible ? "news-sector--animated" : ""}`}
        >
            <a href={news.link} target="_blank" rel="noopener noreferrer">
            <div className="news-image-container">
          <img src={news.imgSrc} alt={t("NewsSection.header")} />
        </div>
      </a>
      <p className="news-description">
        {t("NewsSection.description")}
      </p>
    </article>
  );
};

export const NewsSection: React.FC = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const news = queryClient.getQueryData<NewsInterface[]>("news_list") || [];
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (news.length > 0) {
      const endDate = news[0].endDate ? new Date(news[0].endDate) : null;
      const currentDate = new Date();
      if (endDate && currentDate > endDate) {
        setIsVisible(false);
      }
    }
  }, [news]);

  if (!news.length) {
    // Если данные отсутствуют, можно показать заглушку или ничего не рендерить
    return null;
  }

  return (
    <section className="news-section" style={{ display: isVisible ? "block" : "none" }}>
      <h2>{t("NewsSection.header")}</h2>
      {news.map((newsItem, index) => (
        <News key={index} news={newsItem} />
      ))}
    </section>
  );
};
