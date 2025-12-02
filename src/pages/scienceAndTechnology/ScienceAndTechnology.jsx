import Card from "../../components/card/Card";
import Spinner from "../../components/spinner/Spinner";
import Section from "../../components/mainbody/Section";
import ErrorPage from "../../components/error/ErrorPage";
import { ScienceForHome } from "./science/Science";
import { TechnologyForHome } from "./technology/Technology";
import { useFetch, useIplookup } from "../../hooks/UseFetchForAll";
import { healthOptions, scienceOptions, technologyOptions } from "../../data/gnewsOptions";
import { useNewsdataUrlBuilder } from "../../hooks/useUrlBuilder";

export default function ScienceAndTechnology() {
  const {
    data: ipdata,
    error: ipdataError,
    loading: ipdataLoading
  } = useIplookup()

  const scienceUrl = useNewsdataUrlBuilder(ipdata, scienceOptions)
  const {
    data: scienceData,
    error: scienceError,
    loading: sciencecLoading
  } = useFetch(scienceUrl)

  const technologyUrl = useNewsdataUrlBuilder(ipdata, technologyOptions)
  const {
    data: technologyData,
    error: technologyError,
    loading: technologyLoading
  } = useFetch(technologyUrl)

  const healthUrl = useNewsdataUrlBuilder(ipdata, healthOptions)
  const {
    data: healthData,
    error: healthError,
    loading: healthLoading
  } = useFetch(healthUrl)

  const options = {
    'max': 10,
    'category': 'technology',
    'searchTerm': encodeURIComponent('artificial intelligence'),
    'language': 'en',
    'country': 'us',
    'endpoint': '',
    'source': 'newsdataio'
  }
  const NEWSDATAIO_URL = useNewsdataUrlBuilder(ipdata, options)
  const {
    data: ainews,
    error: ainewsError,
    loading: ainewsLoading
  } = useFetch(NEWSDATAIO_URL)

  const sections = [
    {
      title: 'Latest in Technology',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <TechnologyForHome technologyNewsData={technologyData} ipdata={ipdata} />
    },
    {
      title: 'Artificial Intelligence',
      customGrid: 'grid-area-finance',
      // customClass: 'flex md:flex-wrap [&>*]:basis-1/3 h-full',
      content: (
        ainewsError
          ? (<div className="text-black">Error loading data.</div>)
          : ainews && ainews.data.slice(0, 5).map((article, index) => {
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

      )
    },
    {
      title: 'Latest in Science',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <ScienceForHome scienceNewsData={scienceData} ipdata={ipdata} />
    },
    {
      title: 'Health and Lifestyle',
      customGrid: 'grid-area-finance',
      content: (
        healthData?.error
          ? (<div className="text-black">Error loading data. {healthData.error.message}</div>)
          : healthData && healthData.data.slice(0, 5).map((article) => {
            return (
              <Card
                key={article.id}
                cardTitle={article.title}
                cardImageSrc={article.image}
                source={article.source}
                link={article.url}
              />
            )
          })
      )
    }
  ]
  const isLoading = ipdataLoading || sciencecLoading || technologyLoading || healthLoading || ainewsLoading
  const hasError = ipdataError && scienceError && technologyError && healthError
  return (
    <>
      {hasError && <ErrorPage />}
      {isLoading && <Spinner />}
      {<Section sectionData={sections} />}
    </>
  )
}

export function ScienceTechnologyForHome({ technologyNewsData, scienceNewsData, ipdata }) {

  const sections = [
    {
      title: 'Latest in Technology',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <TechnologyForHome technologyNewsData={technologyNewsData} ipdata={ipdata} />
    },
    {
      title: 'Latest in Science',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <ScienceForHome scienceNewsData={scienceNewsData} ipdata={ipdata} />
    }
  ]
  return (
    <Section id={'science-technology'} sectionData={sections} />
  )
}