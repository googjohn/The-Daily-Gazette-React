import Local from "./local/Local";
import World from "./world/World";
import Spinner from "../../components/spinner/Spinner";
import ErrorPage from "../../components/error/ErrorPage";
import { ScienceTechnologyForHome } from "../scienceAndTechnology/ScienceAndTechnology";
import { FinanceForHome } from "../finance/Finance";
import { EntertainmentForHome } from "../entertainment/Entertainment";
import { SportsForHome } from "../sports/Sports";
import { useFetch, useFetchMulti } from "../../hooks/UseFetchForAll";
import { useRef } from "react";

export default function Home() {
  const ipLookUpURL = '/api/ip/ipLookUp'
  const {
    data: ipdata,
    error: ipdataError,
    loading: ipdataLoading
  } = useFetch(ipLookUpURL);
  const { country } = ipdata?.data || {}

  const newsDataArray = useFetchMulti(country)
  const {
    data: newsArray,
    error: articlesArrayError,
    loading: articlesArrayLoading
  } = newsDataArray || {}
  const news = newsArray?.map(({ forCategory, data }) => {
    return { [forCategory]: data }
  })

  const newsObj = useRef({})

  news?.forEach(category => {
    newsObj.current[Object.keys(category)] = Object.values(category)[0]
  })

  const {
    world: headNewsData,
    nation: localNewsData,
    general: trendNewsData,
    science: scienceNewsData,
    technology: technologyNewsData,
    entertainment: entertainmentNewsData,
    sports: sportsNewsData,
    "sports-nba": nbaNewsData,
    'sports-mlb': mlbNewsData,
    'business-ph': financeNewsData,
    'business-us': moreFinanceNewsData,
  } = newsObj.current || {}

  const TOPICS_DATA = [
    headNewsData,
    trendNewsData,
    localNewsData,
    financeNewsData,
    moreFinanceNewsData,
    entertainmentNewsData,
    technologyNewsData,
    scienceNewsData,
    sportsNewsData,
    nbaNewsData,
    mlbNewsData,
  ]

  const isLoading = TOPICS_DATA?.some(topic => !topic)
  const hasError = articlesArrayError?.some(err => !err)

  return (
    <main className="w-full min-h-screen mx-auto">
      {ipdataError && <ErrorPage error={ipdataError} />}
      {hasError && <div>Error loading content.</div>}
      {(ipdataLoading || isLoading) ? <Spinner />
        : (
          <>
            <World
              headNewsData={headNewsData}
              trendNewsData={trendNewsData} />

            <Local localNewsData={localNewsData} />

            <FinanceForHome
              financeNewsData={financeNewsData}
              moreFinanceNewsData={moreFinanceNewsData} />

            <EntertainmentForHome
              ipdata={ipdata}
              entertainmentNewsData={entertainmentNewsData} />

            <ScienceTechnologyForHome
              ipdata={ipdata}
              scienceNewsData={scienceNewsData}
              technologyNewsData={technologyNewsData} />

            <SportsForHome
              nbanewsData={nbaNewsData}
              mlbnewsData={mlbNewsData}
              sportsnewsData={sportsNewsData} />
          </>
        )
      }
    </main>
  )
}