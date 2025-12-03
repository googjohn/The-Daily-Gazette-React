import Card from "../../components/card/Card";
import ErrorPage from "../../components/error/ErrorPage";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";
import Spinner from "../../components/spinner/Spinner";
import { useFetch, useIplookup } from "../../hooks/UseFetchForAll";
import { entertainmentOptions } from "../../data/gnewsOptions";
import { useNewsdataUrlBuilder } from "../../hooks/useUrlBuilder";
import { NewsSkeleton } from "../../components/skeleton/Skeleton";

export default function Entertainment() {
  const {
    data: ipdata,
    error: ipdataError,
    loading: ipdataLoading
  } = useIplookup()

  const entertainmentUrl = useNewsdataUrlBuilder(ipdata, entertainmentOptions)
  const {
    data: entertainmentNewsData,
    error: entertainmentNewsError,
    loading: entertainmentNewsLoading
  } = useFetch(entertainmentUrl)

  return (
    <>
      {(ipdataError && entertainmentNewsError)
        && <ErrorPage error={ipdataError || entertainmentNewsError} />
      }
      {(ipdataLoading || entertainmentNewsLoading) && <Spinner />}
      <EntertainmentForHome
        ipdata={ipdata}
        entertainmentNewsData={entertainmentNewsData}
      />
    </>
  )
}

export function EntertainmentForHome({ entertainmentNewsData, ipdata }) {

  const options = {
    'max': 10,
    'category': 'entertainment',
    'searchTerm': '',
    'language': 'en',
    'country': '',
    'endpoint': '',
    'source': 'newsdataio'
  }
  const NEWSDATAIO_URL = useNewsdataUrlBuilder(ipdata, options)

  const {
    data: entertainmentData,
    error: entertainmentDataError,
    loading: entertainmentDataLoading
  } = useFetch(NEWSDATAIO_URL)

  const sections = [
    {
      title: 'Latest in Entertainment',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: (
        <>
          <div className="grid grid-template grid-area-entmnt-scitech">
            {entertainmentDataError
              // ? (<div className="text-black">Error loading data.</div>)
              ? <NewsSkeleton len={7} />
              : entertainmentData && entertainmentData.data.slice(0, 7).map((article, index) => {
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
              asideContent={entertainmentNewsData}
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
