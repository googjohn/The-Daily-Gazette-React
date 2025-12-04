import { useEffect, useRef, useState } from "react";
import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";
import Spinner from "../../components/spinner/Spinner";
import ErrorPage from '../../components/error/ErrorPage';
import { useFetch, useIplookup } from "../../hooks/UseFetchForAll";
import { businessOptions, moreBusinessOptions } from "../../data/gnewsOptions.js";
import MarketOverviewWidget from './MarketOverview'
import MarketNewsWidget from "./MarketNews";
import TickerTape from "./TickerTape";
import StockMarketWidget from "./StockMarketOverview";
import MarketChartWidget from "./MarketChart";
import CryptoWidget from "./CryptoMarket";
import { useNewsdataUrlBuilder } from "../../hooks/useUrlBuilder.js";
import { NewsSkeleton } from "../../components/skeleton/Skeleton.jsx";

export default function Finance() {
  const {
    data: ipdata,
    error: ipdataError,
    loading: ipdataLoading
  } = useIplookup()

  // const financeUrl = useNewsdataUrlBuilder(ipdata, businessOptions)
  // const {
  //   data: financeNews,
  //   error: financeNewsError,
  //   loading: financeNewsLoading
  // } = useFetch(financeUrl)

  const morefinanceUrl = useNewsdataUrlBuilder(ipdata, moreBusinessOptions)
  const {
    data: moreFinanceNews,
    error: moreFinanceNewsError,
    loadign: moreFinanceNewsLoading
  } = useFetch(morefinanceUrl)

  const options = {
    'max': 10,
    'category': 'business',
    'searchTerm': '',
    'language': 'en',
    'country': '',
    'endpoint': '',
    'source': 'newsdataio'
  }

  const NEWSDATAIO_URL = useNewsdataUrlBuilder(ipdata, options)
  const {
    data: businessData,
    error: businessDataError,
    loading: businessDataLoading
  } = useFetch(NEWSDATAIO_URL)

  const businessArticles = businessData?.data
  const moreFinanceNewsArticles = moreFinanceNews?.data

  // if (ipdataError && businessDataError && moreFinanceNewsError) return <ErrorPage error={
  //   ipdataError || businessDataError || moreFinanceNewsError
  // } />
  if (ipdataLoading || moreFinanceNewsLoading || businessDataLoading) return <Spinner />

  const localBusinessNews = !businessArticles
    // ? (<div className="text-black">Error loading data.</div>)
    ? <NewsSkeleton len={10} />
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
  const moreBusinessNews = !moreFinanceNews
    ? <NewsSkeleton len={10} />
    : moreFinanceNewsArticles.slice().map((article, index) => (
      <Card
        key={article.id}
        cardTitle={article.title}
        cardDescription={index === 0 ? article.description : null}
        cardImageSrc={article.image}
        source={article.source}
        link={article.url}
      />
    ))

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
      content: moreBusinessNews
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
        !financeNewsData?.data
          ? <NewsSkeleton len={5} />
          : financeNewsData.data.slice(0, 5).map((article, index) => (
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
        !moreFinanceNewsData?.data
          ? <NewsSkeleton len={10} />
          : moreFinanceNewsData.data.map((article, index) => (
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