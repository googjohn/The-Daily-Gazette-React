import Card from "../../../components/card/Card"
import ErrorPage from "../../../components/error/ErrorPage";
import Aside from "../../../components/mainbody/Aside"
import Spinner from "../../../components/spinner/Spinner";
import { technologyOptions } from "../../../data/gnewsOptions";
import { useFetchForAll } from "../../../hooks/UseFetchForAll"
import useIpGetter from "../../../hooks/UseIpGetter";
import { useFetchNews } from "../../home/Home";

export default function Technology() {
  const { ipdata, error: ipdataError } = useIpGetter();
  const technologyNewsData = useFetchNews(technologyOptions, ipdata?.country)
  return (
    <>
      {ipdataError && <ErrorPage />}
      {!technologyNewsData?.articles && <Spinner />}
      {<TechnologyForHome
        ipdata={ipdata}
        entertainmentNewsDAta={technologyNewsData?.articles} />
      }
    </>
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