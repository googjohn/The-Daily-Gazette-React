// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function StockMarketWidget() {
  const container = useRef();
  const hasLoaded = useRef(false)
  useEffect(
    () => {
      if (hasLoaded.current) return;
      hasLoaded.current = true;
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "exchange": "US",
          "colorTheme": "light",
          "dateRange": "12M",
          "showChart": true,
          "locale": "en",
          "largeChartUrl": "",
          "isTransparent": false,
          "showSymbolLogo": false,
          "showFloatingTooltip": false,
          "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
          "plotLineColorFalling": "rgba(41, 98, 255, 1)",
          "gridLineColor": "rgba(240, 243, 250, 0)",
          "scaleFontColor": "#0F0F0F",
          "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
          "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
          "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
          "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
          "symbolActiveColor": "rgba(41, 98, 255, 0.12)",
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
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/markets/stocks-usa/" rel="noopener nofollow" target="_blank"><span className="blue-text">Stocks today</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

export default memo(StockMarketWidget);
