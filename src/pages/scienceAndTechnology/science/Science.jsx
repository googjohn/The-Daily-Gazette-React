import Card from "../../../components/card/Card"
import ErrorPage from "../../../components/error/ErrorPage.jsx";
import Aside from "../../../components/mainbody/Aside"
import Spinner from "../../../components/spinner/Spinner.jsx";
import { scienceOptions } from "../../../data/gnewsOptions.js";
import { useFetchForAll } from "../../../hooks/UseFetchForAll"
import useIpGetter from "../../../hooks/UseIpGetter";
import { useFetchNews } from "../../home/Home";

export default function Science() {
  const { ipdata, error: ipdataError } = useIpGetter();
  const scienceNewsData = useFetchNews(scienceOptions, ipdata?.country)
  return (
    <>
      {ipdataError && <ErrorPage />}
      {!scienceNewsData?.articles && <Spinner />}
      {<ScienceForHome
        ipdata={ipdata}
        entertainmentNewsDAta={scienceNewsData?.articles} />
      }
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
          ? (<div className="text-black">Error loading data.</div>)
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