import Card from "../../../components/card/Card"
import ErrorPage from "../../../components/error/ErrorPage";
import Aside from "../../../components/mainbody/Aside"
import Spinner from "../../../components/spinner/Spinner";
import { technologyOptions } from "../../../data/gnewsOptions";
import { useFetch } from "../../../hooks/UseFetchForAll"
import { useNewsdataUrlBuilder } from "../../../hooks/useUrlBuilder";

export default function Technology() {
  const ipLookUpURL = '/api/ip/ipLookUp'
  const {
    data: ipdata,
    error: ipdataError,
    loading: ipdataLoading
  } = useFetch(ipLookUpURL);

  const technologyUrl = useNewsdataUrlBuilder(ipdata, technologyOptions)
  const {
    data: technologyData,
    error: technologyError,
    loading: technologyLoading,
  } = useFetch(technologyUrl)

  return (
    <>
      {ipdataError && <ErrorPage error={ipdataError} />}
      {(ipdataLoading || !technologyData) && <Spinner />}
      {<TechnologyForHome
        ipdata={ipdata}
        technologyNewsData={technologyData}
      />
      }
    </>
  )
}
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
        {technologyDataError
          ? (<div className="text-black">Error loading data.</div>)
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