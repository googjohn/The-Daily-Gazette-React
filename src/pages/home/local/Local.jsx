import Card from "../../../components/card/Card";
import Section from "../../../components/mainbody/Section";
import { useFetchForAll } from "../../../hooks/UseFetchForAll";

const localOptions = {
  endpoint: 'top-headlines',
  category: 'nation',
  language: 'en',
  country: 'ph',
  max: 10,
  gnewsApikey: import.meta.env.VITE_GNEWS_API_KEY_3,
  ipinfoApikey: import.meta.env.VITE_IPINFO_API_KEY
}

export default function LocalNews() {
  const IPINFO_URL = `https://ipinfo.io/json?token=${localOptions.ipinfoApikey}`;
  const { data: ipData } = useFetchForAll(IPINFO_URL)
  const { country } = ipData || {};

  const GNEWS_URL = `https://gnews.io/api/v4/${localOptions.endpoint}?category=${localOptions.category}&lang=${localOptions.language}&country=${country?.toLowerCase()}&max=${localOptions.max}&apikey=${localOptions.gnewsApikey}`
  const { data: gnewsData } = useFetchForAll(GNEWS_URL)
  const { articles } = gnewsData || {}

  const isIpdataLoading = !ipData;
  const isGnewsDataLoading = ipData && !gnewsData;
  const isLoading = isGnewsDataLoading || isIpdataLoading;

  if (isLoading) return <div className="w-full h-full flex justify-center items-center">Loading...</div>
  const sections = [
    {
      title: 'Latest Local News',
      customGrid: 'grid-area-local',
      content: (
        articles && articles.slice(0, 8).map(article => (
          <Card
            key={article.id}
            cardTitle={article.title}
            cardDescription={article.description}
            cardImageSrc={article.image}
            source={article.source}
            link={article.url}
          />
        ))
      )
    }
  ]

  /*   const errorLoadingClassnames = `absolute top-0 min-h-screen min-w-full flex justify-center items-center bg-(--light-navy)`
    if (loading) return <div className={errorLoadingClassnames}>Loading...</div>
    if (error) return <div className={errorLoadingClassnames}>{`HTTP error: status ${error.statusCode}`}</div> */

  return (
    <Section
      id={'local-news'}
      sectionData={sections}
    />
  )
}