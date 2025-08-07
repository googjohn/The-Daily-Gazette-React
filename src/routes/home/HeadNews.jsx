import { useRef } from "react";
import Card from "../../components/card/Card";
import useFetch from "../../hooks/useFetch";
const headnewsOptions = {
  endpoint: 'top-headlines',
  category: 'world',
  language: 'en',
  max: 10,
  apiKey: import.meta.env.VITE_GNEWS_API_KEY_1
}
export default function HeadNews() {
  const newsData = useRef(null)
  const { data: { articles }, error, loading } = newsData.current = useFetch(headnewsOptions)
  console.log('this is from head news', articles)

  /*   const errorLoadingClassnames = `absolute top-0 min-h-screen min-w-full flex justify-center items-center bg-(--light-navy)`
    if (loading) return <div className={errorLoadingClassnames}>Loading...</div>
    if (error) return <div className={errorLoadingClassnames}>HTTPS error: status {error.statusCode}</div> */

  return (
    <>
      <div id="head-news">
        {
          articles && articles.slice(0, 1).map((article) => (
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
              cardImageSrc={article.image}
              source={article.source}
            />
          ))
        }
      </div>
    </>
  )
}