import { FinanceForHome } from "../finance/Finance";
import { EntertainmentForHome } from "../entertainment/Entertainment";
import { SportsForHome } from "../sports/Sports";
import ScienceTechnology from "../scienceAndTechnology/ScienceAndTechnology";
import Local from "./local/Local";
import World from "./world/World";
import Spinner from "../../components/spinner/Spinner";
import { useFetchForAll } from "../../hooks/UseFetchForAll";
import ErrorPage from "../../components/error/ErrorPage";
import {
  localOptions,
  sportsOptions,
  scienceOptions,
  headnewsOptions,
  businessOptions,
  trendnewsOptions,
  technologyOptions,
  moreBusinessOptions,
  entertainmentOptions,
} from "../../data/gnewsOptions";

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

  const query = searchTerm ?
    (searchTerm === 'weather' ?
      `/api/news?searchTerm=${searchTerm}&lang=${language}&country=${country}&max=${max}` :
      `/api/news?searchTerm=${searchTerm}&lang=${language}&country=${country || ipCountry || 'us'}&max=${max}`) :
    `/api/news?category=${category}&lang=${language}&country=${country || ipCountry || 'us'}&max=${max}&endpoint=${endpoint}`;

  const { data, error } = useFetchForAll(query);
  const articles = data?.articles || data?.news
  return { articles, error }
}

export const useFetch = (country) => {
  const query = country ?
    `/api/allNews?country=${country}` : null
  const { data, error } = useFetchForAll(query)
  return { data, error }
}

export default function Home() {
  const { data: ipData, error: ipFetchError } = useFetchForAll(`https://ipinfo.io/json?token=${IPINFO_API_KEY}`)
  const { country: ipCountry } = ipData || {}

  const articlesArray = useFetch(ipCountry)
  const { data: articlesArrayData, error: articlesArrayError } = articlesArray || {}
  const articles = articlesArrayData?.map(data => {
    return { [data?.forCategory]: data?.result?.articles }
  })
  console.log(articles)
  const newsObj = {}

  articles?.forEach(article => {
    const key = Object.keys(article)
    const value = Object.values(article)
    if (!(key in newsObj)) {
      newsObj[key] = value[0]
    }
  })

  console.log(newsObj)

  const {
    world: headNewsArticles,
    nation: localNewsArticles,
    general: trendNewsArticles,
    science: scienceNewsArticles,
    technology: technologyNewsArticles,
    entertainment: entertainmentNewsArticles,
    sports: sportsNewsArticles,
    "sports-nba": nbaNewsArticles,
    'sports-mlb': mlbNewsArticles,
    'business-PH': financeNewsArticles,
    'business-us': moreFinanceNewsArticles,
  } = newsObj || {}

  // const { articles: headNewsArticles, error: headNewsError } = useFetchNews(headnewsOptions, ipCountry)
  // const { articles: trendNewsArticles, error: trendNewsError } = useFetchNews(trendnewsOptions, ipCountry)
  // const { articles: localNewsArticles, error: localNewsError } = useFetchNews(localOptions, ipCountry)
  // const { articles: financeNewsArticles, error: financeNewsError } = useFetchNews(businessOptions, ipCountry)
  // const { articles: moreFinanceNewsArticles, error: moreFinanceNewsError } = useFetchNews(moreBusinessOptions, ipCountry)
  // const { articles: entertainmentNewsArticles, error: entertainmentNewsError } = useFetchNews(entertainmentOptions, ipCountry)
  // const { articles: technologyNewsArticles, error: technologyNewsError } = useFetchNews(technologyOptions, ipCountry)
  // const { articles: scienceNewsArticles, error: scienceNewsError } = useFetchNews(scienceOptions, ipCountry)
  // const { articles: sportsNewsArticles, error: sportsNewsError } = useFetchNews(sportsOptions, ipCountry)
  // const { articles: nbaNewsArticles, error: nbaNewsError } = useFetchNews(sportsOptions, ipCountry, 'nba')
  // const { articles: mlbNewsArticles, error: mlbNewsError } = useFetchNews(sportsOptions, ipCountry, 'mlb')

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

  // const TOPICS_ERROR = [
  //   headNewsError,
  //   trendNewsError,
  //   localNewsError,
  //   financeNewsError,
  //   moreFinanceNewsError,
  //   entertainmentNewsError,
  //   technologyNewsError,
  //   scienceNewsError,
  //   sportsNewsError,
  //   nbaNewsError,
  //   mlbNewsError,
  // ]
  const isLoading = TOPICS_DATA.some(topic => !topic)
  // const hasError = TOPICS_ERROR.some(err => err)

  return (
    <main className="w-full min-h-screen mx-auto">
      {(ipdataLoading || isLoading) && (ipFetchError || articlesArrayError ? <ErrorPage /> : <Spinner />)}
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