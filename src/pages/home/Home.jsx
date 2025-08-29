import Finance, { businessOptions, moreBusinessOptions } from "../finance/Finance";
import Entertainment, { entertainmentOptions } from "../entertainment/Entertainment";
import Sports, { sportsOptions } from "../sports/Sports";
import ScienceTechnology from "../scienceAndTechnology/ScienceAndTechnology";
import Local, { localOptions } from "./local/Local";
import World from "./world/World";
import Spinner from "../../components/spinner/Spinner";
import { useFetchForAll } from "../../hooks/UseFetchForAll";
import { headnewsOptions } from "./world/Head";
import { trendnewsOptions } from "./world/Trend";
import { technologyOptions } from "../scienceAndTechnology/technology/Technology";
import { scienceOptions } from "../scienceAndTechnology/science/Science";

const GENERATE_CATEGORY_URL = (newsOptions, country) => {
  return `https://gnews.io/api/v4/${newsOptions.endpoint}?category=${newsOptions.category}&lang=${newsOptions.language}&country=${newsOptions.country || country?.toLowerCase() || 'us'}&max=${newsOptions.max}&apikey=${newsOptions.gnewsApikey}`
}

const IPINFO_API_KEY = import.meta.env.VITE_IPINFO_API_KEY;

export default function Home() {

  const { data: ipData } = useFetchForAll(`https://ipinfo.io/json?token=${IPINFO_API_KEY}`)
  const { country } = ipData || {}

  const headNewsUrl = GENERATE_CATEGORY_URL(headnewsOptions, country);
  const { data: headNewsData } = useFetchForAll(headNewsUrl)
  const { articles: headNewsArticles } = headNewsData || {}

  const trendNewsUrl = GENERATE_CATEGORY_URL(trendnewsOptions, country)
  const { data: trendNewsData } = useFetchForAll(trendNewsUrl)
  const { articles: trendNewsArticles } = trendNewsData || {}

  const localNewsUrl = GENERATE_CATEGORY_URL(localOptions, country)
  const { data: localNewsData } = useFetchForAll(localNewsUrl)
  const { articles: localNewsArticles } = localNewsData || {}

  const financeNewsUrl = GENERATE_CATEGORY_URL(businessOptions, country)
  const { data: financeNewsData } = useFetchForAll(financeNewsUrl)
  const { articles: financeNewsArticles } = financeNewsData || {}

  const moreFinanceNewsUrl = GENERATE_CATEGORY_URL(moreBusinessOptions, country)
  const { data: moreFinanceNewsData } = useFetchForAll(moreFinanceNewsUrl)
  const { articles: moreFinanceNewsArticles } = moreFinanceNewsData || {}

  const entertainmentNewsUrl = GENERATE_CATEGORY_URL(entertainmentOptions, country)
  const { data: entertainmentNewsData } = useFetchForAll(entertainmentNewsUrl)
  const { articles: entertainmentNewsArticles } = entertainmentNewsData || {}

  const technologyNewsUrl = GENERATE_CATEGORY_URL(technologyOptions, country)
  const { data: technologyNewsData } = useFetchForAll(technologyNewsUrl)
  const { articles: technologyNewsArticles } = technologyNewsData || {}

  const scienceNewsUrl = GENERATE_CATEGORY_URL(scienceOptions, country)
  const { data: scienceNewsData } = useFetchForAll(scienceNewsUrl)
  const { articles: scienceNewsArticles } = scienceNewsData || {}

  const sportsNewsUrl = GENERATE_CATEGORY_URL(sportsOptions, country)
  const { data: sportsNewsData } = useFetchForAll(sportsNewsUrl)
  const { articles: sportsNewsArticles } = sportsNewsData || {}

  const GNEWS_NBA_URL = `https://gnews.io/api/v4/search?q=nba&apikey=${sportsOptions.gnewsNbaApikey}`;
  const { data: nbaNewsData } = useFetchForAll(GNEWS_NBA_URL)
  const { articles: nbaArticles } = nbaNewsData || {}

  const GNEWS_MLB_URL = `https://gnews.io/api/v4/search?q=mlb&apikey=${sportsOptions.gnewsMlbApikey}`;
  const { data: mlbNewsData } = useFetchForAll(GNEWS_MLB_URL)
  const { articles: mlbArticles } = mlbNewsData || {}

  const ipdataLoading = !ipData;
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

  const isLoaded = TOPICS_DATA.some(topic => !topic)

  if (ipdataLoading || isLoaded) return <Spinner />

  return (
    <main className="w-full mx-auto">
      <World
        headNewsData={headNewsArticles}
        trendNewsData={trendNewsArticles} />

      <Local localNewsData={localNewsArticles} />

      <Finance
        financeNewsData={financeNewsArticles}
        moreFinanceNewsData={moreFinanceNewsArticles} />

      <Entertainment entertainementNewsDAta={entertainmentNewsArticles} />

      <ScienceTechnology
        scienceNewsData={scienceNewsArticles}
        technologyNewsData={technologyNewsArticles} />

      <Sports
        nbaNewsDAta={nbaArticles}
        mlbNewsData={mlbArticles}
        sportsNewsData={sportsNewsArticles} />
    </main>
  )
}