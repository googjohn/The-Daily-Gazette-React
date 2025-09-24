import Card from "../../components/card/Card"
import Error from "../../components/error/Error"
import Spinner from "../../components/spinner/Spinner"
import { useFetchForAll } from "../../hooks/UseFetchForAll"

export default function WeatherNews() {
  const NEWSAPIORG_URL = `https://newsapi.org/v2/everything?q=weather&language=en&apiKey=${import.meta.env.VITE_NEWSAPIORG_API_KEY}`
  const { data: weatherNews, error: weatherNewsError } = useFetchForAll(NEWSAPIORG_URL)
  const { articles } = weatherNews || {}

  const slicedArticles = articles?.length > 24 ? articles?.slice(0, 24) : articles?.slice()

  return (
    <div id="weather-news" className="container w-full sm:w-11/12 p-2.5 max-w-[1280px] mx-auto mt-10 rounded-xl backdrop-blur-lg shadow-[var(--bs-banner-1)]">
      <div className="weather-news-card">
        <div className="weather-heading ">
          <h2 className="text-white text-xl py-2.5 pb-5 border-b border-white/20">Weather News</h2>
        </div>
        {!weatherNews && <Spinner />}
        {weatherNewsError && (<Error />)}
        <div className="bg-[var(--gray-10)] mt-6">
          <div className="p-2.5 flex flex-col grid-template-search sm:grid 
              sm:[&>*]:col-span-6 md:[&>*]:col-span-4 lg:[&>*]:col-span-3 gap-2.5">

            {slicedArticles && slicedArticles?.slice(0, 24).map(article => (
              <Card
                key={article.description}
                cardTitle={article.title}
                cardImageSrc={article.urlToImage}
                link={article.urll}
                source={article?.source?.name} />
            ))}

          </div>
        </div>
      </div>
    </div>
  )
}