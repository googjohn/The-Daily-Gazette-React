import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";
import useFetch from "../../hooks/useFetch";
const sportsOptions = {
  endpoint: 'top-headlines',
  category: 'sports',
  language: 'en',
  max: 10,
  apiKey: import.meta.env.VITE_GNEWS_API_KEY_8
}
export default function Sports() {
  const { data: { articles }, error, loading } = useFetch(sportsOptions)
  /*  const errorLoadingClassnames = `absolute top-0 min-h-screen min-w-full flex justify-center items-center bg-(--light-navy)`
   if (loading) return <div className={errorLoadingClassnames}>Loading...</div>
   if (error) return <div className={errorLoadingClassnames}>{`HTTP error: status ${error.statusCode}`}</div> */
  const sections = [
    {
      title: 'Latest in Sports',
      customGrid: 'grid-area-sports-container',
      content: (
        <>
          <div className="grid grid-template grid-area-sports">
            {articles && articles.slice(0, 9).map((article, index) => (
              <Card
                key={article.id}
                cardTitle={article.title}
                cardDescription={index === 0 ? article.description : null}
                cardImageSrc={article.image}
                source={article.source}
              />
            ))}
          </div>
          <div className="aside">
            <Aside asideTitle={'NBA Sports Updates'} />
            <Aside asideTitle={'MLB Sports Updates'} />
          </div>
        </>
      )
    }
  ]
  return (
    <Section id={'sports-news'} sectionData={sections} />
  )
}