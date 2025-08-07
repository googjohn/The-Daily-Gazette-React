import { useRef } from "react";
import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";
import useFetch from "../../hooks/useFetch";

const businessOptions = {
  endpoint: 'top-headlines',
  category: 'business',
  language: 'en',
  max: 10,
  apiKey: import.meta.env.VITE_GNEWS_API_KEY_4
}
const moreBusinessOptions = {
  endpoint: 'top-headlines',
  category: 'business',
  language: 'en',
  country: 'us',
  max: 10,
  apiKey: import.meta.env.VITE_GNEWS_API_KEY_9
}
export default function BusinessFinance() {

  const businessData = useRef(null)
  const moreBusinessData = useRef(null)
  const { data: { articles }, error, loading } = businessData.current = useFetch(businessOptions)
  console.log('this is the data from business finance', articles)

  const { data: { articles: popularArticles }, error: popularError, loading: popularLoading } = moreBusinessData.current = useFetch(moreBusinessOptions)
  console.log('this is popular articles for more business', popularArticles)
  let sections = [
    {
      title: 'Business and Finance',
      customGrid: 'grid-area-finance',
      content: (
        articles && articles.slice(0, 5).map((article, index) => (
          <Card
            key={article.id}
            cardTitle={article.title}
            cardDescription={index === 0 ? article.description : null}
            cardImageSrc={article.image}
            source={article.source}
          />
        ))
      )
    },
    {
      title: 'Popular in Business and Finance',
      customGrid: 'grid-area-more-finance',
      content: (
        popularArticles && popularArticles.slice().map((article, index) => (
          <Card
            key={article.id}
            cardTitle={article.title}
            cardDescription={index === 0 ? article.description : null}
            cardImageSrc={article.image}
            source={article.source}
          />
        ))
      )
    }
  ]

  /*   const errorLoadingClassnames = `absolute top-0 min-h-screen min-w-full flex justify-center items-center bg-(--light-navy)`
    if (loading) return <div className={errorLoadingClassnames}>Loading...</div>
    if (error) return <div className={errorLoadingClassnames}>{`HTTP error: status ${error.statusCode}`}</div> */

  return (
    <Section
      id={'finance-news'}
      sectionData={sections}
    />
  )
}