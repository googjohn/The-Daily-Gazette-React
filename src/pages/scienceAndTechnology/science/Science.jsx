import Card from "../../../components/card/Card"
import Aside from "../../../components/mainbody/Aside"
import { useFetchForAll } from "../../../hooks/UseFetchForAll";

const scienceOptions = {
  endpoint: 'top-headlines',
  category: 'science',
  language: 'en',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_7,
  ipinfoApikey: import.meta.env.VITE_IPINFO_API_KEY
}

export default function Science() {
  const IPINFO_URL = `https://ipinfo.io/json?token=${scienceOptions.ipinfoApikey}`;
  const { data: { country } } = useFetchForAll(IPINFO_URL)

  const GNEWS_URL = `https://gnews.io/api/v4/${scienceOptions.endpoint}?category=${scienceOptions.category}&lang=${scienceOptions.language}&country=${country.toLowerCase() || 'us'}&max=${scienceOptions.max}&apikey=${scienceOptions.gnewsApikey}`
  const { data: { articles } } = useFetchForAll(GNEWS_URL)

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
          asideTitle={'More on Science'}
          asideContent={articles?.slice(7)}
        />
      </div>
    </>
  )
}