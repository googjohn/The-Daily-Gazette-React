import Card from "../../../components/card/Card"
import Aside from "../../../components/mainbody/Aside"

export default function Science() {
  return (
    <>
      <div>Science</div>
    </>
  )
}
export function ScienceForHome({ scienceNewsData }) {

  return (
    <>
      <div className="grid grid-template grid-area-entmnt-scitech">
        {scienceNewsData && scienceNewsData.slice(0, 7).map((article, index) => (
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
          asideContent={scienceNewsData?.slice(7)}
        />
      </div>
    </>
  )
}