import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";
import Spinner from "../../components/spinner/Spinner";
import { useFetchForAll } from "../../hooks/UseFetchForAll";

const entertainmentOptions = {
  endpoint: 'top-headlines',
  category: 'entertainment',
  language: 'en',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_5,
  ipinfoApikey: import.meta.env.VITE_IPINFO_API_KEY
}
export default function Entertainment() {
  const IPINFO_URL = `https://ipinfo.io/json?token=${entertainmentOptions.ipinfoApikey}`;
  const { data: ipData } = useFetchForAll(IPINFO_URL)
  const { country } = ipData || {};

  const GNEWS_URL = `https://gnews.io/api/v4/${entertainmentOptions.endpoint}?category=${entertainmentOptions.category}&lang=${entertainmentOptions.language}&country=${country?.toLowerCase() || 'us'}&max=${entertainmentOptions.max}&apikey=${entertainmentOptions.gnewsApikey}`
  const { data: gnewsData } = useFetchForAll(GNEWS_URL)
  const { articles } = gnewsData || {}

  const isIpdataLoading = !ipData;
  const isGnewsDataLoading = ipData && !gnewsData;
  const isLoading = isGnewsDataLoading || isIpdataLoading

  if (isLoading) return <Spinner />

  const sections = [
    {
      title: 'Latest in Entertainment',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: (
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
              asideTitle={'More on Entertainment'}
              asideContent={articles?.slice(7)}
            />
          </div>
        </>
      )
    }
  ]
  return (
    <Section
      id={'entertainment-news'}
      sectionData={sections}
    />
  )
}
