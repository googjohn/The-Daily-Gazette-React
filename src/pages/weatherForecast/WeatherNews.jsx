import { useState, useEffect } from "react"
import Card from "../../components/card/Card"
import ErrorPage from "../../components/error/ErrorPage"
import Spinner from "../../components/spinner/Spinner"
import { useFetchNews } from "../home/Home"

export default function WeatherNews({ ipdata }) {
  const { country } = ipdata || {}
  // const [weatherNewsData, setWeatherNewsData] = useState([]);

  // const NEWSAPIORG_URL = `https://newsapi.org/v2/everything?q=weather&language=en&apiKey=${import.meta.env.VITE_NEWSAPIORG_API_KEY}`
  // const { data: weatherNews, error: weatherNewsError } = useFetchForAll(NEWSAPIORG_URL)
  // const { articles } = weatherNews || {}
  // const { articles: weatherNewsArticlesUs, error: weatherNewsErrorUs } = useFetchNews({
  //   language: 'en',
  //   country: 'us',
  //   max: 10,
  // }, country, 'weather forecast')
  // const { articles: weatherNewsArticlesPh, error: weatherNewsErrorPh } = useFetchNews({
  //   language: 'en',
  //   country: 'ph',
  //   max: 10,
  // }, country, 'weather forecast')
  // const { articles: weatherNewsArticlesIn, error: weatherNewsErrorIn } = useFetchNews({
  //   language: 'en',
  //   country: 'in',
  //   max: 10,
  // }, country, 'weather forecast')

  // useEffect(() => {
  //   if (weatherNewsArticlesPh && weatherNewsArticlesUs && weatherNewsArticlesIn) {
  //     setWeatherNewsData(prev => [...prev, ...weatherNewsArticlesPh, ...weatherNewsArticlesUs, ...weatherNewsArticlesIn])
  //   }
  // }, [weatherNewsArticlesPh, weatherNewsArticlesUs, weatherNewsArticlesIn])

  const { articles: weatherNewsArticles, error: weatherNewsError } = useFetchNews({
    language: 'en',
    country: 'us',
    max: 24
  }, country, 'weather')

  const slicedArticles = weatherNewsArticles?.length > 24 ? weatherNewsArticles?.slice(0, 24) : weatherNewsArticles?.slice()
  // const slicedArticles = weatherNewsData?.length > 24 ? weatherNewsData?.slice(0, 24) : weatherNewsData?.slice()

  return (
    <div id="weather-news"
      className="container w-full sm:w-11/12 p-2.5 max-w-[1280px] mx-auto mt-10 rounded-xl 
      backdrop-blur-lg shadow-[var(--bs-banner-1)]">
      <div className="weather-news-card">
        <div className="weather-heading ">
          <h2 className="text-white text-xl py-2.5 pb-5 border-b border-white/20">Weather News</h2>
        </div>
        {!weatherNewsArticles ? <Spinner /> :

          weatherNewsError ? (<ErrorPage error={weatherNewsError} />) :

            <div className="bg-[var(--gray-10)] mt-6">
              <div className="p-2.5 flex flex-col grid-template-search sm:grid 
              sm:[&>*]:col-span-6 md:[&>*]:col-span-4 lg:[&>*]:col-span-3 gap-2.5">

                {slicedArticles && slicedArticles?.slice(0, 24).map((article, i) => (
                  <Card
                    key={`${article.id}-${i}`}
                    cardTitle={article.title}
                    cardImageSrc={article.image}
                    link={article.url}
                  // source={article.source} 
                  />
                ))}

              </div>
            </div>
        }
      </div>
    </div>
  )
}