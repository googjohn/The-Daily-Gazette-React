import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";
import useFetch from "../../hooks/useFetch";

const trendnewsOptions = {
  endpoint: 'top-headlines',
  category: 'general',
  language: 'en',
  max: 10,
  apiKey: import.meta.env.VITE_GNEWS_API_KEY_2
}
export default function TrendingNews() {
  const { data: { articles }, error, loading } = useFetch(trendnewsOptions)
  console.log('this is from trendnews', articles)

  /*   const errorLoadingClassnames = `absolute top-0 min-h-screen min-w-full flex justify-center items-center bg-(--light-navy)`
    if (loading) return <div className={errorLoadingClassnames}>Loading...</div>
    if (error) return <div className={errorLoadingClassnames}>{`HTTP error: status ${error.statusCode}`}</div> */

  return (
    <>
      <div id="trend-news" className="grid grid-template grid-area-trend">
        {articles && articles.slice(0, 3).map(article => (
          <Card
            key={article.id}
            cardTitle={article.title}
            cardDescription={article.description}
            cardImageSrc={article.image}
            source={article.source}
            link={article.url}
          />
        ))
        }
      </div>
      <div className="aside">
        <Aside
          asideTitle={'More Trending News'}
          asideContent={articles?.slice(3)}
        />
      </div>
    </>
  )
}