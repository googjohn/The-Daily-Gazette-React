import Card from "../../../components/card/Card"
import Aside from "../../../components/mainbody/Aside"
import { useFetchForAll } from "../../../hooks/UseFetchForAll"

const technologyOptions = {
  endpoint: 'top-headlines',
  category: 'technology',
  language: 'en',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_6,
  ipinfoApikey: import.meta.env.VITE_IPINFO_API_KEY
}

export default function Technology() {
  const IPINFO_URL = `https://ipinfo.io/json?token=${technologyOptions.ipinfoApikey}`;
  const { data: ipData } = useFetchForAll(IPINFO_URL)
  const { country } = ipData || {}

  const GNEWS_URL = `https://gnews.io/api/v4/${technologyOptions.endpoint}?category=${technologyOptions.category}&lang=${technologyOptions.language}&country=${country?.toLowerCase() || 'us'}&max=${technologyOptions.max}&apikey=${technologyOptions.gnewsApikey}`
  const { data: gnewsData } = useFetchForAll(GNEWS_URL)
  const { articles } = gnewsData || {}

  const isIpdataLoading = !ipData;
  const isGnewsDataLoading = ipData && !gnewsData;
  const isLoading = isIpdataLoading || isGnewsDataLoading;

  if (isLoading) return <div className="w-full h-full flex justify-center items-center">Loading...</div>

  return (
    <>
      <div className="grid grid-template grid-area-entmnt-scitech">
        {articles && articles.slice(0, 7).map((article, index) => (
          <Card
            key={article.id}
            cardTitle={article.title}
            cardDescription={index === 0 ? article.description : null}
            cardImageSrc={article.image}
            source={article.source}
            link={article.url}
          />
        ))}
      </div>
      <div className="aside">
        <Aside
          asideTitle={'More on Technology'}
          asideContent={articles?.slice(7)}
        />
      </div>
    </>
  )
}