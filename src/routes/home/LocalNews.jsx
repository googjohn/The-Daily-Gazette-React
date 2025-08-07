import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";
import useFetch from "../../hooks/useFetch";
const localOptions = {
  endpoint: 'top-headlines',
  category: 'nation',
  language: 'en',
  country: 'ph',
  max: 10,
  apiKey: import.meta.env.VITE_GNEWS_API_KEY_3
}
export default function LocalNews() {
  const { data: { articles }, error, loading } = useFetch(localOptions)
  const sections = [
    {
      title: 'Latest Local News',
      customGrid: 'grid-area-local',
      content: (
        articles && articles.slice(0, 8).map(article => (
          <Card
            key={article.id}
            cardTitle={article.title}
            cardDescription={article.description}
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
      id={'local-news'}
      sectionData={sections}
    />
  )
}