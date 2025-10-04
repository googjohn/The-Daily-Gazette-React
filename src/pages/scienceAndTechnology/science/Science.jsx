import Card from "../../../components/card/Card"
import Aside from "../../../components/mainbody/Aside"
import { useFetchForAll } from "../../../hooks/UseFetchForAll"

export default function Science() {
  return (
    <>
      <div>Science</div>
    </>
  )
}
export function ScienceForHome({ scienceNewsData, ipdata }) {

  const NEWSDATAIO_URL = ipdata?.country
    ? `https://newsdata.io/api/1/latest?country=${ipdata?.country}&language=en&category=science&&apikey=${import.meta.env.VITE_NEWSDATAIO_API_KEY}`
    : null
  const { data: scienceNews, error: scienceError } = useFetchForAll(NEWSDATAIO_URL)
  const scienceArticles = scienceNews?.results

  return (
    <>
      <div className="grid grid-template grid-area-entmnt-scitech">
        {scienceError
          ? (<div>Error loading data.</div>)
          : scienceArticles && scienceArticles.slice(0, 7).map((article, index) => {
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
          asideTitle={'More on Science'}
          asideContent={scienceNewsData}
        />
      </div>
    </>
  )
}