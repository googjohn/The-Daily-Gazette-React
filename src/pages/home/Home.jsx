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

export const useFetchNews = (options, ipCountry, searchTerm) => {
  // destructure the options {}
  const {
    endpoint,
    category,
    country,
    language = 'en',
    max = 10,
  } = options;

  const query = searchTerm
    ? `/api/news?searchTerm=${searchTerm}&lang=${language}&country=${country || ipCountry || 'us'}&max=${max}`
    : `/api/news?category=${category}&lang=${language}&country=${country || ipCountry || 'us'}&max=${max}&endpoint=${endpoint}`;

  const { data, error } = useFetchForAll(query);
  const articles = data?.articles
  return { articles, error }
}

export default function Home() {

  const { data: ipData, error: ipFetchError } = useFetchForAll(`https://ipinfo.io/json?token=${IPINFO_API_KEY}`)
  const { country: ipCountry } = ipData || {}

  const { articles: headNewsArticles, error: headNewsError } = useFetchNews(headnewsOptions, ipCountry)
  const { articles: trendNewsArticles, error: trendNewsError } = useFetchNews(trendnewsOptions, ipCountry)
  const { articles: localNewsArticles, error: localNewsError } = useFetchNews(localOptions, ipCountry)
  const { articles: financeNewsArticles, error: financeNewsError } = useFetchNews(businessOptions, ipCountry)
  const { articles: moreFinanceNewsArticles, error: moreFinanceNewsError } = useFetchNews(moreBusinessOptions, ipCountry)
  const { articles: entertainmentNewsArticles, error: entertainmentNewsError } = useFetchNews(entertainmentOptions, ipCountry)
  const { articles: technologyNewsArticles, error: technologyNewsError } = useFetchNews(technologyOptions, ipCountry)
  const { articles: scienceNewsArticles, error: scienceNewsError } = useFetchNews(scienceOptions, ipCountry)
  const { articles: sportsNewsArticles, error: sportsNewsError } = useFetchNews(sportsOptions, ipCountry)
  const { articles: nbaNewsArticles, error: nbaNewsError } = useFetchNews(sportsOptions, ipCountry, 'nba')
  const { articles: mlbNewsArticles, error: mlbNewsError } = useFetchNews(sportsOptions, ipCountry, 'mlb')

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

  const TOPICS_ERROR = [
    headNewsError,
    trendNewsError,
    localNewsError,
    financeNewsError,
    moreFinanceNewsError,
    entertainmentNewsError,
    technologyNewsError,
    scienceNewsError,
    sportsNewsError,
    nbaNewsError,
    mlbNewsError,
  ]
  const isLoading = TOPICS_DATA.some(topic => !topic)
  const hasError = TOPICS_ERROR.some(err => err)
  console.log(hasError)
  return (
    <main className="w-full min-h-screen mx-auto">
      {(ipdataLoading || isLoading) && (ipFetchError || hasError ? <ErrorPage /> : <Spinner />)}
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