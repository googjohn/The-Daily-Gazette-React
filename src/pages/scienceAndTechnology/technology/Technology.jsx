import Card from "../../../components/card/Card"
import Aside from "../../../components/mainbody/Aside"
import { NewsSkeleton } from "../../../components/skeleton/Skeleton";
import { useFetch } from "../../../hooks/UseFetchForAll"
import { useNewsdataUrlBuilder } from "../../../hooks/useUrlBuilder";

export function TechnologyForHome({ technologyNewsData, ipdata }) {
  const { country } = ipdata?.data || {}
  const options = {
    'max': 10,
    'category': 'technology',
    'searchTerm': '',
    'language': 'en',
    'country': country,
    'endpoint': '',
    'source': 'newsdataio'
  }

  const NEWSDATAIO_URL = useNewsdataUrlBuilder(ipdata, options)

  const {
    data: technologyData,
    error: technologyDataError,
    loading: technologyDataLoading
  } = useFetch(NEWSDATAIO_URL)

  return (
    <>
      <div className="grid grid-template grid-area-entmnt-scitech">
        {!technologyData?.data
          // ? (<div className="text-black">Error loading data.</div>)
          ? <NewsSkeleton len={7} />
          : technologyData && technologyData.data.slice(0, 7).map((article, index) => {
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