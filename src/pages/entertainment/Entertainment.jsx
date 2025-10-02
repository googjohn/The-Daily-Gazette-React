import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";

export const entertainmentOptions = {
  endpoint: 'top-headlines',
  category: 'entertainment',
  language: 'en',
  max: 10,
}

export default function Entertainment() {
  return (
    <div className="min-h-screen bg-[var(--gray-10)]">Entertainment</div>
  )
}

export function EntertainmentForHome({ entertainementNewsDAta }) {

  const sections = [
    {
      title: 'Latest in Entertainment',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: (
        <>
          <div className="grid grid-template grid-area-entmnt-scitech">
            {entertainementNewsDAta && entertainementNewsDAta.slice(0, 7).map((article, index) => (
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
              asideContent={entertainementNewsDAta?.slice(7)}
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
