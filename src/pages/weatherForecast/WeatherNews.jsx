import Card from "../../components/card/Card"
import Spinner from "../../components/spinner/Spinner"
import { useFetch } from "../../hooks/UseFetchForAll"
import { useNewsdataUrlBuilder } from "../../hooks/useUrlBuilder"

export default function WeatherNews({ ipdata }) {

  const worldnewsUrl = useNewsdataUrlBuilder(ipdata, {
    'max': 24,
    'endpoint': '',
    'country': 'us',
    'language': 'en',
    'category': '',
    'searchTerm': 'weather',
    'source': 'worldnews'
  })

  const {
    data: weatherNews,
    error: weatherNewsError,
    loading: weatherNewsLoading
  } = useFetch(worldnewsUrl)

  const weatherNewsArticles = weatherNews?.data

  const slicedArticles = weatherNewsArticles?.length > 24 ? weatherNewsArticles?.slice(0, 24) : weatherNewsArticles?.slice()

  return (
    <div id="weather-news"
      className="container w-full sm:w-11/12 p-2.5 max-w-[1280px] mx-auto mt-10 rounded-xl 
      backdrop-blur-lg shadow-[var(--bs-banner-1)]">
      <div className="weather-news-card">
        <div className="weather-heading ">
          <h2 className="text-white text-xl py-2.5 pb-5 border-b border-white/20">Weather News</h2>
        </div>
        {
          weatherNewsError ? (<div>Error loading data. {weatherNewsError.message}</div>) :

            weatherNewsLoading ? <Spinner /> :

              <div className="bg-[var(--gray-10)] mt-6">
                <div className="p-2.5 flex flex-col grid-template-search sm:grid 
              sm:[&>*]:col-span-6 md:[&>*]:col-span-4 lg:[&>*]:col-span-3 gap-2.5">

                  {slicedArticles && slicedArticles?.slice(0, 24).map((article, i) => {
                    const url = new URL(article.url)
                    const source = {
                      url: url.origin,
                      name: url.hostname
                    }
                    return (
                      <Card
                        key={`${article.id}-${i}`}
                        cardTitle={article.title}
                        cardImageSrc={article.image}
                        link={article.url}
                        source={source}
                      />
                    )
                  })}

                </div>
              </div>
        }
      </div>
    </div>
  )
}