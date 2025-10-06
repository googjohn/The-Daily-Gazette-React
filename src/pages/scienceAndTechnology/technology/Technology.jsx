import Card from "../../../components/card/Card"
import Aside from "../../../components/mainbody/Aside"
import { useFetchForAll } from "../../../hooks/UseFetchForAll"

export default function Technology() {
  return (
    <div>Techonology</div>
  )
}
export function TechnologyForHome({ technologyNewsData, ipdata }) {

  const NEWSDATAIO_URL = ipdata?.country
    ? `https://newsdata.io/api/1/latest?country=${ipdata?.country}&language=en&category=technology&apikey=${import.meta.env.VITE_NEWSDATAIO_API_KEY_3}`
    : null
  const { data: technologyNews, error: tehcnologyError } = useFetchForAll(NEWSDATAIO_URL)
  const technologyArticles = technologyNews?.results

  return (
    <>
      <div className="grid grid-template grid-area-entmnt-scitech">
        {tehcnologyError
          ? (<div className="text-black">Error loading data.</div>)
          : technologyArticles && technologyArticles.slice(0, 7).map((article, index) => {
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
          asideTitle={'More on Technology'}
          asideContent={technologyNewsData}
        />
      </div>
    </>
  )
}