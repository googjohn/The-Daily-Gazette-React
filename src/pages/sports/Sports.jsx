import Card from "../../components/card/Card";
import useIpGetter from "../../hooks/UseIpGetter";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";
import { useFetchNews } from "../home/Home";
import { useFetchForAll } from "../../hooks/UseFetchForAll";
import { mlbOptions, nbaOptions } from "../../data/gnewsOptions";
import ErrorPage from "../../components/error/ErrorPage";
import Spinner from "../../components/spinner/Spinner";
import { useEffect } from "react";

export default function Sports() {
  const { ipdata, error: ipdataError } = useIpGetter();
  const nbaNewsData = useFetchNews(nbaOptions, ipdata?.country, 'nba')
  const mlbNewsData = useFetchNews(mlbOptions, ipdata?.country, 'mlb')

  useEffect(() => {
    // Get standings
    fetch("http://127.0.0.1:8000/api/standings")
      .then(res => res.json())
      .then(data => console.log(data));
  }, [])

  const allError = ipdataError || nbaNewsData?.error || mlbNewsData?.error
  const isLoading = !nbaNewsData?.articles || !mlbNewsData?.articles
  return (
    <>
      {allError && <ErrorPage />}
      {isLoading && <Spinner />}
      {<SportsForHome
        ipdata={ipdata}
        nbaNewsDAta={nbaNewsData?.articles}
        mlbNewsData={mlbNewsData?.articles}
      />}
    </>
  )
}
export function SportsForHome({ ipdata, nbaNewsDAta, mlbNewsData }) {

  const NEWSDATAIO_URL = ipdata?.country
    ? `https://newsdata.io/api/1/latest?country=${ipdata?.country}&language=en&category=sports&q=sports&apikey=${import.meta.env.VITE_NEWSDATAIO_API_KEY_4}`
    : null
  const { data: sportsNews, error: sportsError } = useFetchForAll(NEWSDATAIO_URL)
  const sportsArticles = sportsNews?.results

  const sections = [
    {
      title: 'Latest in Sports',
      customGrid: 'grid-area-sports-container',
      content: (
        <>
          <div className="grid grid-template grid-area-sports">
            {sportsError
              ? (<div className="text-black">Error loading data.</div>)
              : sportsArticles && sportsArticles.slice(0, 9).map((article, index) => {
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
              asideTitle={'NBA Sports Updates'}
              asideContent={nbaNewsDAta}
            />
            <Aside
              asideTitle={'MLB Sports Updates'}
              asideContent={mlbNewsData}
            />
          </div>
        </>
      )
    }
  ]
  return (
    <Section id={'sports-news'} sectionData={sections} />
  )
}