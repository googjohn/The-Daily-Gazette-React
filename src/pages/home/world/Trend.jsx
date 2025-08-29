import Card from "../../../components/card/Card";
import Aside from "../../../components/mainbody/Aside";

export const trendnewsOptions = {
  endpoint: 'top-headlines',
  category: 'general',
  language: 'en',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_2,
  ipinfoApikey: import.meta.env.VITE_IPINFO_API_KEY
}

export default function TrendingNews({ trendNewsData }) {

  return (
    <>
      <div id="trend-news" className="grid grid-template grid-area-trend">
        {trendNewsData && trendNewsData?.slice(0, 3).map(article => (
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
          asideContent={trendNewsData?.slice(3)}
        />
      </div>
    </>
  )
}