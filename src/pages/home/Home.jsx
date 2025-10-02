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
import ErrorPage from "../../components/error/ErrorPage";

const IPINFO_API_KEY = import.meta.env.VITE_IPINFO_API_KEY;

const useFetchNews = (options, ipCountry, searchTerm) => {
  // destructure the options {}
  const {
    endpoint,
    searchEndpoint,
    category,
    country,
    language = 'en',
    max = 10,
  } = options;

  const query = searchTerm
    ? `/api/news?searchTerm=${searchTerm}&lang=${language}&country=${country || ipCountry || 'us'}&max=${max}&searchEndpoint=${searchEndpoint}`
    : `/api/news?category=${category}&lang=${language}&country=${country || ipCountry || 'us'}&max=${max}&endpoint=${endpoint}`;

  const { data } = useFetchForAll(query);
  return data?.articles
}

export default function Home() {

  const { data: ipData, error: ipFetchError } = useFetchForAll(`https://ipinfo.io/json?token=${IPINFO_API_KEY}`)
  const { country: ipCountry } = ipData || {}

  const headNewsArticles = useFetchNews(headnewsOptions, ipCountry)
  const trendNewsArticles = useFetchNews(trendnewsOptions, ipCountry)
  const localNewsArticles = useFetchNews(localOptions, ipCountry)
  const financeNewsArticles = useFetchNews(businessOptions, ipCountry)
  const moreFinanceNewsArticles = useFetchNews(moreBusinessOptions, ipCountry)
  const entertainmentNewsArticles = useFetchNews(entertainmentOptions, ipCountry)
  const technologyNewsArticles = useFetchNews(technologyOptions, ipCountry)
  const scienceNewsArticles = useFetchNews(scienceOptions, ipCountry)
  const sportsNewsArticles = useFetchNews(sportsOptions, ipCountry)
  const nbaNewsArticles = useFetchNews(sportsOptions, ipCountry, 'nba')
  const mlbNewsArticles = useFetchNews(sportsOptions, ipCountry, 'mlb')

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

  return (
    <main className="w-full min-h-screen mx-auto">
      {(ipdataLoading || isLoading) && (ipFetchError ? <ErrorPage /> : <Spinner />)}
      <World
        headNewsData={headNewsArticles}
        trendNewsData={trendNewsArticles}
      />

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