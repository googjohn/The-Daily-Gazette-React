import { useEffect, useRef, useState } from "react";
import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";
import Spinner from "../../components/spinner/Spinner";
import ErrorPage from '../../components/error/ErrorPage';
import { useFetchForAll } from "../../hooks/UseFetchForAll";
import { businessOptions, moreBusinessOptions } from "../../data/gnewsOptions.js";
import useIpGetter from "../../hooks/UseIpGetter";
import MarketOverviewWidget from './MarketOverview'
import MarketNewsWidget from "./MarketNews";
import TickerTape from "./TickerTape";
import StockMarketWidget from "./StockMarketOverview";
import MarketChartWidget from "./MarketChart";
import CryptoWidget from "./CryptoMarket";
import { useFetchNews } from "../home/Home";

/* const IPINFO_API_KEY = import.meta.env.VITE_IPINFO_API_KEY;

const generateGnewsUrl = (newsOptions, country, searchTerm) => searchTerm ?
  `https://gnews.io/api/v4/${newsOptions.searchEndpoint}?q=${searchTerm}&apikey=${searchTerm === 'nba' ? newsOptions.gnewsNbaApikey : newsOptions.gnewsMlbApikey}` :
  `https://gnews.io/api/v4/${newsOptions.endpoint}?category=${newsOptions.category}&lang=${newsOptions.language}&country=${newsOptions.country || country?.toLowerCase() || 'us'}&max=${newsOptions.max}&apikey=${import.meta.env.VITE_GNEWS_API_KEY_4}`

const useFetchNews = (options, country, searchTerm) => {
  const { data } = useFetchForAll(generateGnewsUrl(options, country, searchTerm));
  return data?.articles
} */

export default function Finance() {
  const { ipdata, error: ipdataError } = useIpGetter();
  const { country } = ipdata || {}

  // const financeNewsArticles = useFetchNews(businessOptions, country)
  const moreFinanceNewsArticles = useFetchNews(moreBusinessOptions, country)

  const NEWSDATAIO_URL = ipdata?.country
    ? `https://newsdata.io/api/1/latest?country=${ipdata?.country}&language=en&category=business&apikey=${import.meta.env.VITE_NEWSDATAIO_API_KEY_5}`
    : null
  const { data: businessNews, error: businessError } = useFetchForAll(NEWSDATAIO_URL)
  const businessArticles = businessNews?.results

  const ipdataLoading = !ipdata;
  const TOPICS_DATA = [
    businessArticles,
    moreFinanceNewsArticles,
  ]

  const isLoading = TOPICS_DATA.some(topic => !topic)

  if (ipdataError || businessError) return <ErrorPage />
  if (ipdataLoading || isLoading) return <Spinner />

  const localBusinessNews = businessError
    ? (<div className="text-black">Error loading data.</div>)
    : businessArticles && businessArticles.map((article, index) => {
      const source = {
        url: article.source_url,
        name: article.source_name,
      }

      return (
        <Card
          key={article.article_id}
          cardTitle={article.title}
          cardDescription={index === 0 ? article.description : null}
          cardImageSrc={article.image_url}
          source={source}
          link={article.link}
        />
      )
    })

  const tradingview = (
    <div className="flex [&>*]:basis-1/3 [&>*]:shrink [&>*]:grow [&>*]:h-[550px] flex-col sm:flex-row flex-wrap lg:flex-nowrap gap-2.5 w-full">
      <div className="">
        <MarketOverviewWidget />
      </div>
      <div className="">
        <StockMarketWidget />
      </div>
      <div className="">
        <MarketNewsWidget />
      </div>
    </div>
  )

  let sections = [
    {
      title: 'Business and Finance',
      customGrid: 'grid-area-more-finance',
      content: localBusinessNews
    },
    {
      title: 'Market Overview',
      customGrid: '',
      customClass: '',
      content: tradingview
    },
    {
      title: 'Popular in Business and Finance',
      customGrid: 'grid-area-more-finance',
      content: (
        moreFinanceNewsArticles?.articles && moreFinanceNewsArticles?.articles?.slice().map((article, index) => (
          <Card
            key={article.id}
            cardTitle={article.title}
            cardDescription={index === 0 ? article.description : null}
            cardImageSrc={article.image}
            source={article.source}
            link={article.url}
          />
        ))
      )
    },
    {
      title: 'Market Chart',
      customGrid: '',
      customClass: 'h-[610px]',
      content: <MarketChartWidget />
    },
    {
      title: 'Crypto Currency Market',
      customGrid: '',
      customClass: 'h-[610px]',
      content: <CryptoWidget />
    },
  ]

  return (
    <>
      <TickerTape />
      <Section
        id={'finance-news'}
        sectionData={sections}
      />
    </>
  )
}

export function FinanceForHome({ financeNewsData, moreFinanceNewsData }) {

  let sections = [
    {
      title: 'Business and Finance',
      customGrid: 'grid-area-finance',
      content: (
        financeNewsData && financeNewsData.slice(0, 5).map((article, index) => (
          <Card
            key={article.id}
            cardTitle={article.title}
            cardDescription={index === 0 ? article.description : null}
            cardImageSrc={article.image}
            source={article.source}
            link={article.url}
          />
        ))
      )
    },
    {
      title: 'Popular in Business and Finance',
      customGrid: 'grid-area-more-finance',
      content: (
        moreFinanceNewsData && moreFinanceNewsData.slice().map((article, index) => (
          <Card
            key={article.id}
            cardTitle={article.title}
            cardDescription={index === 0 ? article.description : null}
            cardImageSrc={article.image}
            source={article.source}
            link={article.url}
          />
        ))
      )
    }
  ]

  return (
    <Section
      id={'finance-news'}
      sectionData={sections}
    />
  )
}