import { businessOptions, FinanceForHome, moreBusinessOptions } from "../finance/Finance";
import { EntertainmentForHome, entertainmentOptions } from "../entertainment/Entertainment";
import { SportsForHome, sportsOptions } from "../sports/Sports";
import ScienceTechnology from "../scienceAndTechnology/ScienceAndTechnology";
import Local, { localOptions } from "./local/Local";
import World from "./world/World";
import Spinner from "../../components/spinner/Spinner";
import { useFetchForAll } from "../../hooks/UseFetchForAll";
import { headnewsOptions } from "./world/Head";
import { trendnewsOptions } from "./world/Trend";
import { technologyOptions } from "../scienceAndTechnology/technology/Technology";
import { scienceOptions } from "../scienceAndTechnology/science/Science";

const IPINFO_API_KEY = import.meta.env.VITE_IPINFO_API_KEY;

const generateGnewsUrl = (newsOptions, country, searchTerm) => searchTerm ?
  `https://gnews.io/api/v4/${newsOptions.searchEndpoint}?q=${searchTerm}&apikey=${searchTerm === 'nba' ? newsOptions.gnewsNbaApikey : newsOptions.gnewsMlbApikey}` :
  `https://gnews.io/api/v4/${newsOptions.endpoint}?category=${newsOptions.category}&lang=${newsOptions.language}&country=${newsOptions.country || country?.toLowerCase() || 'us'}&max=${newsOptions.max}&apikey=${newsOptions.gnewsApikey}`

const useFetchNews = (options, country, searchTerm) => {
  const { data } = useFetchForAll(generateGnewsUrl(options, country, searchTerm));
  return data?.articles
}

export default function Home() {

  const { data: ipData, error: ipFetchError } = useFetchForAll(`https://ipinfo.io/json?token=${IPINFO_API_KEY}`)
  const { country } = ipData || {}

  const headNewsArticles = useFetchNews(headnewsOptions, country)
  const trendNewsArticles = useFetchNews(trendnewsOptions, country)
  const localNewsArticles = useFetchNews(localOptions, country)
  const financeNewsArticles = useFetchNews(businessOptions, country)
  const moreFinanceNewsArticles = useFetchNews(moreBusinessOptions, country)
  const entertainmentNewsArticles = useFetchNews(entertainmentOptions, country)
  const technologyNewsArticles = useFetchNews(technologyOptions, country)
  const scienceNewsArticles = useFetchNews(scienceOptions, country)
  const sportsNewsArticles = useFetchNews(sportsOptions, country)
  const nbaNewsArticles = useFetchNews(sportsOptions, country, 'nba')
  const mlbNewsArticles = useFetchNews(sportsOptions, country, 'mlb')

  const ipdataLoading = !ipData;
  const TOPICS_DATA = [
    headNewsArticles,
    trendNewsArticles,
    localNewsArticles,
    financeNewsArticles,
    moreFinanceNewsArticles,
    entertainmentNewsArticles,
    technologyNewsArticles,
    scienceNewsArticles,
    sportsNewsArticles,
    nbaNewsArticles,
    mlbNewsArticles,
  ]

  const isLoading = TOPICS_DATA.some(topic => !topic)

  if (ipdataLoading || isLoading) return <Spinner />

  return (
    <main className="w-full min-h-screen mx-auto">
      <World
        headNewsData={headNewsArticles}
        trendNewsData={trendNewsArticles} />

      <Local localNewsData={localNewsArticles} />

      <FinanceForHome
        financeNewsData={financeNewsArticles}
        moreFinanceNewsData={moreFinanceNewsArticles} />

      <EntertainmentForHome entertainementNewsDAta={entertainmentNewsArticles} />

      <ScienceTechnology
        scienceNewsData={scienceNewsArticles}
        technologyNewsData={technologyNewsArticles} />

      <SportsForHome
        nbaNewsDAta={nbaNewsArticles}
        mlbNewsData={mlbNewsArticles}
        sportsNewsData={sportsNewsArticles} />
    </main>
  )
}