import React, { useEffect } from "react";

const Analytics: React.FC = () => {
  useEffect(() => {
    // Добавляем код Google Tag
    const script1 = document.createElement("script");
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-D483C80RGJ";
    script1.async = true;
    document.head.appendChild(script1);

    // Добавляем настройки gtag
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-D483C80RGJ');
    `;
    document.head.appendChild(script2);
  }, []);

  return null; // Поскольку этот компонент ничего не рендерит
};

export default Analytics;
