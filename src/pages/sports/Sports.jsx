import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";
import { useFetchForAll } from "../../hooks/UseFetchForAll";

const sportsOptions = {
  endpoint: 'top-headlines',
  category: 'sports',
  language: 'en',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_8,
  ipinfoApikey: import.meta.env.VITE_IPINFO_API_KEY
}
export default function Sports() {
  const IPINFO_URL = `https://ipinfo.io/json?token=${sportsOptions.ipinfoApikey}`;
  const { data: { country } } = useFetchForAll(IPINFO_URL)

  const GNEWS_URL = `https://gnews.io/api/v4/${sportsOptions.endpoint}?category=${sportsOptions.category}&lang=${sportsOptions.language}&country=${country.toLowerCase() || 'us'}&max=${sportsOptions.max}&apikey=${sportsOptions.gnewsApikey}`
  const { data: { articles } } = useFetchForAll(GNEWS_URL)
  const sections = [
    {
      title: 'Latest in Sports',
      customGrid: 'grid-area-sports-container',
      content: (
        <>
          <div className="grid grid-template grid-area-sports">
            {articles && articles.slice(0, 9).map((article, index) => (
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
            <Aside asideTitle={'NBA Sports Updates'} />
            <Aside asideTitle={'MLB Sports Updates'} />
          </div>
        </>
      )
    }
  ]
  return (
    <Section id={'sports-news'} sectionData={sections} />
  )
}