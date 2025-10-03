import Card from "../../../components/card/Card"
import Aside from "../../../components/mainbody/Aside"

export default function Technology() {
  return (
    <div>Techonology</div>
  )
}
export function TechnologyForHome({ technologyNewsData }) {

  return (
    <>
      <div className="grid grid-template grid-area-entmnt-scitech">
        {technologyNewsData && technologyNewsData.slice(0, 7).map((article, index) => (
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
          asideContent={technologyNewsData?.slice(7)}
        />
      </div>
    </>
  )
}