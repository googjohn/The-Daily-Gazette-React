import { useRef } from "react";
import Card from "../../components/card/Card";
import useFetch from "../../hooks/useFetch";
const headnewsOptions = {
  endpoint: 'top-headlines',
  category: 'general',
  language: 'en',
  max: 10
}
export default function HeadNews() {
  const newsData = useRef(null)
  const { articles } = newsData.current = useFetch(headnewsOptions)
  console.log('this is from head news', articles)
  return (
    <>
      <div id="head-news">
        {
          articles && articles.slice(0, 1).map(article => (
            <Card
              key={article.id}
              cardTitle={article.title}
              cardDescription={article.description}
              cardImageSrc={article.image}
              source={article.source}
            />
          ))
        }
      </div>
      <div className="grid-item grid grid-template grid-area-box">
        {
          articles && articles.slice(1, 5).map((article) => (
            <Card
              key={article.id}
              cardTitle={article.title}
              cardDescription={article.description}
              cardImageSrc={article.image}
              source={article.source}
            />
          ))
        }
      </div>
    </>
  )
}