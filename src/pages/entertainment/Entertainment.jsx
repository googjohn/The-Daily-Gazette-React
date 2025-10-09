import Card from "../../components/card/Card";
import ErrorPage from "../../components/error/ErrorPage";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";
import Spinner from "../../components/spinner/Spinner";
import { entertainmentOptions } from "../../data/gnewsOptions";
import { useFetchForAll } from "../../hooks/UseFetchForAll";
import useIpGetter from "../../hooks/UseIpGetter";
import { useFetchNews } from "../home/Home";

export default function Entertainment() {
  const { ipdata, error: ipdataError } = useIpGetter();
  const entertainmentNewsData = useFetchNews(entertainmentOptions, ipdata?.country)
  return (
    <>
      {ipdataError && <ErrorPage />}
      {!entertainmentNewsData?.articles && <Spinner />}
      {<EntertainmentForHome
        ipdata={ipdata}
        entertainmentNewsDAta={entertainmentNewsData?.articles} />
      }
    </>
  )
}

export function EntertainmentForHome({ entertainmentNewsDAta, ipdata }) {

  const NEWSDATAIO_URL = ipdata?.country
    ? `https://newsdata.io/api/1/latest?country=${ipdata?.country}&language=en&category=entertainment&&apikey=${import.meta.env.VITE_NEWSDATAIO_API_KEY_2}`
    : null
  const { data: entertainmentNews, error: entertainmentError } = useFetchForAll(NEWSDATAIO_URL)
  const entertainmentArticles = entertainmentNews?.results

  const sections = [
    {
      title: 'Latest in Entertainment',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: (
        <>
          <div className="grid grid-template grid-area-entmnt-scitech">
            {entertainmentError
              ? (<div className="text-black">Error loading data.</div>)
              : entertainmentArticles && entertainmentArticles.slice(0, 7).map((article, index) => {
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
              asideTitle={'More on Entertainment'}
              asideContent={entertainmentNewsDAta}
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
