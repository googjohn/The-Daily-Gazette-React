import Card from "../../../components/card/Card";
import Aside from "../../../components/mainbody/Aside";

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