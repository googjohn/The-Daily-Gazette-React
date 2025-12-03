import Card from "../../../components/card/Card";
import Section from "../../../components/mainbody/Section";
import { NewsSkeleton } from "../../../components/skeleton/Skeleton";

export default function LocalNews({ localNewsData }) {

  const sections = [
    {
      title: 'Latest Local News',
      customGrid: 'grid-area-local',
      content: (
        !localNewsData
          ? <NewsSkeleton len={8} />
          : localNewsData.data.slice(0, 8).map(article => (
            <Card
              key={article.id}
              cardTitle={article.title}
              cardDescription={article.description}
              cardImageSrc={article.image}
              source={article.source}
              link={article.url}
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