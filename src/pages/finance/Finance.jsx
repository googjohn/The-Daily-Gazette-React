import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";

export const businessOptions = {
  endpoint: 'top-headlines',
  category: 'business',
  language: 'en',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_4
}
export const moreBusinessOptions = {
  endpoint: 'top-headlines',
  category: 'business',
  language: 'en',
  country: 'us',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_9,
}

export default function Finance({ financeNewsData, moreFinanceNewsData }) {

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