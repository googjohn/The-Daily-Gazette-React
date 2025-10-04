import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";
import { useFetchForAll } from "../../hooks/UseFetchForAll";

export default function Sports() {
  return (
    <div className="min-h-screen bg-[var(--gray-10)]">Sports</div>
  )
}
export function SportsForHome({ ipdata, sportsNewsData, nbaNewsDAta, mlbNewsData }) {

  const NEWSDATAIO_URL = ipdata?.country
    ? `https://newsdata.io/api/1/latest?country=${ipdata?.country}&language=en&category=sports&apikey=${import.meta.env.VITE_NEWSDATAIO_API_KEY_4}`
    : null
  const { data: sportsNews, error: sportsError } = useFetchForAll(NEWSDATAIO_URL)
  const sportsArticles = sportsNews?.results

  const sections = [
    {
      title: 'Latest in Sports',
      customGrid: 'grid-area-sports-container',
      content: (
        <>
          <div className="grid grid-template grid-area-sports">
            {sportsError
              ? (<div>Error loading data.</div>)
              : sportsArticles && sportsArticles.slice(0, 9).map((article, index) => {
                const source = {
                  url: article.source_url,
                  name: article.source_name,
                }

                return (
                  <Card
                    key={article.article_id}
                    cardTitle={article.title}
                    cardDescription={index === 0 ? article.description : null}
                    cardImageSrc={article.image_url}
                    source={source}
                    link={article.link}
                  />
                )
              })
            }
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