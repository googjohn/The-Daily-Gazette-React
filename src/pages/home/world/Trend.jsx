import Card from "../../../components/card/Card";
import Aside from "../../../components/mainbody/Aside";

export default function TrendingNews({ trendNewsData }) {
  const trendnews = {
    data: trendNewsData?.data.slice(3)
  }
  return (
    <>
      <div id="trend-news" className="grid grid-template grid-area-trend">
        {trendNewsData && trendNewsData.data.slice(0, 3).map(article => (
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
          asideContent={trendnews}
        />
      </div>
    </>
  )
}