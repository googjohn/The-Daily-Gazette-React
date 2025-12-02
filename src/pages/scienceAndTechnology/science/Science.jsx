import Card from "../../../components/card/Card"
import Aside from "../../../components/mainbody/Aside"
import { useFetch } from "../../../hooks/UseFetchForAll"
import { useNewsdataUrlBuilder } from "../../../hooks/useUrlBuilder.js";

export function ScienceForHome({ scienceNewsData, ipdata }) {

  const options = {
    'max': 10,
    'category': 'science',
    'searchTerm': '',
    'language': 'en',
    'country': ipdata?.data?.country,
    'endpoint': '',
    'source': 'newsdataio'
  }

  const NEWSDATAIO_URL = useNewsdataUrlBuilder(ipdata, options)
  const {
    data: scienceData,
    error: scienceDataError,
    loading: scienceDataLoading
  } = useFetch(NEWSDATAIO_URL)

  return (
    <>
      <div className="grid grid-template grid-area-entmnt-scitech">
        {scienceDataError
          ? (<div className="text-black">Error loading data.</div>)
          : scienceData && scienceData?.data.slice(0, 7).map((article, index) => {
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