import { useEffect } from "react";
import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";
import Spinner from "../../components/spinner/Spinner";
import { useFetchForAll } from "../../hooks/UseFetchForAll";

export const businessOptions = {
  endpoint: 'top-headlines',
  category: 'business',
  language: 'en',
  max: 10,
}
export const moreBusinessOptions = {
  endpoint: 'top-headlines',
  category: 'business',
  language: 'en',
  country: 'us',
  max: 10,
}

const IPINFO_API_KEY = import.meta.env.VITE_IPINFO_API_KEY;

const generateGnewsUrl = (newsOptions, country, searchTerm) => searchTerm ?
  `https://gnews.io/api/v4/${newsOptions.searchEndpoint}?q=${searchTerm}&apikey=${searchTerm === 'nba' ? newsOptions.gnewsNbaApikey : newsOptions.gnewsMlbApikey}` :
  `https://gnews.io/api/v4/${newsOptions.endpoint}?category=${newsOptions.category}&lang=${newsOptions.language}&country=${newsOptions.country || country?.toLowerCase() || 'us'}&max=${newsOptions.max}&apikey=${newsOptions.gnewsApikey}`

const useFetchNews = (options, country, searchTerm) => {
  const { data } = useFetchForAll(generateGnewsUrl(options, country, searchTerm));
  return data?.articles
}

export default function Finance() {

  const { data: ipData, error: ipFetchError } = useFetchForAll(`https://ipinfo.io/json?token=${IPINFO_API_KEY}`)
  const { country } = ipData || {}

  const financeNewsArticles = useFetchNews(businessOptions, country)
  const moreFinanceNewsArticles = useFetchNews(moreBusinessOptions, country)

  const ipdataLoading = !ipData;
  const TOPICS_DATA = [
    financeNewsArticles,
    moreFinanceNewsArticles,
  ]

  const isLoading = TOPICS_DATA.some(topic => !topic)

  if (ipdataLoading || isLoading) return <Spinner />

  let sections = [
    {
      title: 'Business and Finance',
      customGrid: 'grid-area-finance',
      content: (
        financeNewsArticles && financeNewsArticles.slice(0, 5).map((article, index) => (
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
        moreFinanceNewsArticles && moreFinanceNewsArticles.slice().map((article, index) => (
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