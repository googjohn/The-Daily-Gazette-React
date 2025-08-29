import Card from "../../../components/card/Card"
import Aside from "../../../components/mainbody/Aside"

export const scienceOptions = {
  endpoint: 'top-headlines',
  category: 'science',
  language: 'en',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_7,
  ipinfoApikey: import.meta.env.VITE_IPINFO_API_KEY
}

export default function Science({ scienceNewsData }) {

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