import Card from "../../../components/card/Card";
import { NewsSkeleton } from "../../../components/skeleton/Skeleton";

export default function HeadNews({ headNewsData }) {

  return (
    <>
      <div className="grid-item grid">
        {
          !headNewsData?.data || !headNewsData?.ok || headNewsData?.error
            ?
            <NewsSkeleton len={1} />
            : headNewsData.data.slice(0, 1).map((article) => (
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
          !headNewsData
            ? <NewsSkeleton len={4} />
            : headNewsData.data.slice(1, 5).map((article) => (
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