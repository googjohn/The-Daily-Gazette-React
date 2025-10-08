import React, { useEffect, useRef, memo } from 'react';

function CryptoWidget() {
  const container = useRef();
  const hasLoaded = useRef(false)
  useEffect(
    () => {
      if (hasLoaded.current) return;
      hasLoaded.current = true;

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "defaultColumn": "overview",
          "screener_type": "crypto_mkt",
          "displayCurrency": "USD",
          "colorTheme": "light",
          "isTransparent": false,
          "locale": "en",
          "width": "100%",
          "height": "100%"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container rounded-lg shadow-[var(--bs-cards-lup-ddown)] w-full overflow-hidden" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/markets/cryptocurrencies/prices-all/" rel="noopener nofollow" target="_blank"><span className="blue-text">Crypto markets</span></a><span className="trademark"> by TradingView</span></div>
    </div>
  );
}

export default memo(CryptoWidget);
