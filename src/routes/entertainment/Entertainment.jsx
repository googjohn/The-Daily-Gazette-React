import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";
import useFetch from "../../hooks/useFetch";
const entertainmentOptions = {
  endpoint: 'top-headlines',
  category: 'entertainment',
  language: 'en',
  max: 10,
  apiKey: import.meta.env.VITE_GNEWS_API_KEY_5
}
export default function Entertainment() {
  const { data: { articles }, error, loading } = useFetch(entertainmentOptions)

  const sections = [
    {
      title: 'Latest in Entertainment',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: (
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
              asideTitle={'More on Entertainment'}
              asideContent={articles?.slice(7)}
            />
          </div>
        </>
      )
    }
  ]
  return (
    <Section
      id={'entertainment-news'}
      sectionData={sections}
    />
  )
}
