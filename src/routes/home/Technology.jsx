import Card from "../../components/card/Card"
import Aside from "../../components/mainbody/Aside"
import useFetch from "../../hooks/useFetch"
const technologyOptions = {
  endpoint: 'top-headlines',
  category: 'technology',
  language: 'en',
  max: 10,
  apiKey: import.meta.env.VITE_GNEWS_API_KEY_6
}
export default function Technology() {
  const { data: { articles }, error, loading } = useFetch(technologyOptions)
  /*  const errorLoadingClassnames = `absolute top-0 min-h-screen min-w-full flex justify-center items-center bg-(--light-navy)`
   if (loading) return <div className={errorLoadingClassnames}>Loading...</div>
   if (error) return <div className={errorLoadingClassnames}>{`HTTP error: status ${error.statusCode}`}</div> */

  return (
    <>
      <div className="grid grid-template grid-area-entmnt-scitech">
        {articles && articles.slice(0, 7).map((article, index) => (
          <Card
            key={article.id}
            cardTitle={article.title}
            cardDescription={index === 0 ? article.description : null}
            cardImageSrc={article.image}
            source={article.source}
            link={article.url}
          />
        ))}
      </div>
      <div className="aside">
        <Aside
          asideTitle={'More on Technology'}
          asideContent={articles?.slice(7)}
        />
      </div>
    </>
  )
}