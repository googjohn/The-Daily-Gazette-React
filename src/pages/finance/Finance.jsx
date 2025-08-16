import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";
import { useFetchForAll } from "../../hooks/UseFetchForAll";

const businessOptions = {
  endpoint: 'top-headlines',
  category: 'business',
  language: 'en',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_4
}
const moreBusinessOptions = {
  endpoint: 'top-headlines',
  category: 'business',
  language: 'en',
  country: 'us',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_9,
}
const ipinfoApikey = import.meta.env.VITE_IPINFO_API_KEY;

export default function Finance() {
  const IPINFO_URL = `https://ipinfo.io/json?token=${ipinfoApikey}`;
  const { data: { country } } = useFetchForAll(IPINFO_URL)

  const GNEWS_URL = `https://gnews.io/api/v4/${businessOptions.endpoint}?category=${businessOptions.category}&lang=${businessOptions.language}&country=${country?.toLowerCase() || 'us'}&max=${businessOptions.max}&apikey=${businessOptions.gnewsApikey}`
  const { data: { articles: financeArticles } } = useFetchForAll(GNEWS_URL)

  const GNEWS_URL_2 = `https://gnews.io/api/v4/${moreBusinessOptions.endpoint}?category=${moreBusinessOptions.category}&lang=${moreBusinessOptions.language}&country=${moreBusinessOptions.country}&max=${moreBusinessOptions.max}&apikey=${moreBusinessOptions.gnewsApikey}`
  const { data: { articles: popularFinanceArticles } } = useFetchForAll(GNEWS_URL_2)

  let sections = [
    {
      title: 'Business and Finance',
      customGrid: 'grid-area-finance',
      content: (
        financeArticles && financeArticles.slice(0, 5).map((article, index) => (
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
        popularFinanceArticles && popularFinanceArticles.slice().map((article, index) => (
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