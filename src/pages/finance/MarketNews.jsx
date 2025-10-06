// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function MarketNewsWidget() {
  const container = useRef();
  const hasLoaded = useRef(false)
  useEffect(
    () => {
      if (hasLoaded.current) return
      hasLoaded.current = true;

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "displayMode": "regular",
          "feedMode": "all_symbols",
          "colorTheme": "light",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "height": "550"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container rounded-lg shadow-[var(--bs-cards-lup-ddown)] w-full overflow-hidden" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/news/top-providers/tradingview/" rel="noopener nofollow" target="_blank"><span className="blue-text">Top stories</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

export default memo(MarketNewsWidget);
