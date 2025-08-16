import Card from "../../../components/card/Card";
import { useFetchForAll } from "../../../hooks/UseFetchForAll";
const headnewsOptions = {
  endpoint: 'top-headlines',
  category: 'world',
  language: 'en',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_1,
  ipinfoApikey: import.meta.env.VITE_IPINFO_API_KEY
}
export default function HeadNews() {
  const IPINFO_URL = `https://ipinfo.io/json?token=${headnewsOptions.ipinfoApikey}`;
  const { data: { country } } = useFetchForAll(IPINFO_URL)

  const GNEWS_URL = `https://gnews.io/api/v4/${headnewsOptions.endpoint}?category=${headnewsOptions.category}&lang=${headnewsOptions.language}&country=${country?.toLowerCase() || 'us'}&max=${headnewsOptions.max}&apikey=${headnewsOptions.gnewsApikey}`
  const { data: { articles } } = useFetchForAll(GNEWS_URL)

  return (
    <>
      <div id="head-news">
        {
          articles && articles.slice(0, 1).map((article) => (
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
      <div className="grid-item grid grid-template grid-area-box">
        {
          articles && articles.slice(1, 5).map((article) => (
            <Card
              key={article.id}
              cardTitle={article.title}
              cardImageSrc={article.image}
              source={article.source}
              link={article.url}
            />
          ))
        }
      </div>
    </>
  )
}