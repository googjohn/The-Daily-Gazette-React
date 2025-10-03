import { BiCategory } from "react-icons/bi";
import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";

export default function Sports() {
  return (
    <div className="min-h-screen bg-[var(--gray-10)]">Sports</div>
  )
}
export function SportsForHome({ sportsNewsData, nbaNewsDAta, mlbNewsData }) {

  const sections = [
    {
      title: 'Latest in Sports',
      customGrid: 'grid-area-sports-container',
      content: (
        <>
          <div className="grid grid-template grid-area-sports">
            {sportsNewsData && sportsNewsData.slice(0, 9).map((article, index) => (
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
              asideTitle={'NBA Sports Updates'}
              asideContent={nbaNewsDAta}
            />
            <Aside
              asideTitle={'MLB Sports Updates'}
              asideContent={mlbNewsData}
            />
          </div>
        </>
      )
    }
  ]
  return (
    <Section id={'sports-news'} sectionData={sections} />
  )
}