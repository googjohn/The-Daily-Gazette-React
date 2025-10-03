import Card from "../../../components/card/Card";

export default function HeadNews({ headNewsData }) {

  return (
    <>
      <div id="head-news">
        {
          headNewsData && headNewsData?.slice(0, 1).map((article) => (
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
          headNewsData && headNewsData?.slice(1, 5).map((article) => (
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