import Card from "../../../components/card/Card";
import Aside from "../../../components/mainbody/Aside";
import { useFetchForAll } from "../../../hooks/UseFetchForAll";

const trendnewsOptions = {
  endpoint: 'top-headlines',
  category: 'general',
  language: 'en',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_2,
  ipinfoApikey: import.meta.env.VITE_IPINFO_API_KEY
}

export default function TrendingNews() {
  const IPINFO_URL = `https://ipinfo.io/json?token=${trendnewsOptions.ipinfoApikey}`;
  const { data: ipData } = useFetchForAll(IPINFO_URL)
  const { country } = ipData || {}

  const GNEWS_URL = `https://gnews.io/api/v4/${trendnewsOptions.endpoint}?category=${trendnewsOptions.category}&lang=${trendnewsOptions.language}&country=${country?.toLowerCase() || 'us'}&max=${trendnewsOptions.max}&apikey=${trendnewsOptions.gnewsApikey}`
  const { data: gnewsData } = useFetchForAll(GNEWS_URL)
  const { articles } = gnewsData || {};

  const isIpdataLoading = !ipData;
  const isGnewsDataLoading = ipData && !gnewsData;
  const isLoading = isGnewsDataLoading || isIpdataLoading;

  if (isLoading) return <div className="w-full h-full flex justify-center items-center">Loading...</div>
  return (
    <>
      <div id="trend-news" className="grid grid-template grid-area-trend">
        {articles && articles.slice(0, 3).map(article => (
          <Card
            key={article.id}
            cardTitle={article.title}
            cardDescription={article.description}
            cardImageSrc={article.image}
            source={article.source}
            link={article.url}
          />
        ))
        }
      </div>
      <div className="aside">
        <Aside
          asideTitle={'More Trending News'}
          asideContent={articles?.slice(3)}
        />
      </div>
    </>
  )
}