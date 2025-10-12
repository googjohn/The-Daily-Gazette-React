import Card from "../../components/card/Card";
import Spinner from "../../components/spinner/Spinner";
import Section from "../../components/mainbody/Section";
import ErrorPage from "../../components/error/ErrorPage";
import useIpGetter from "../../hooks/UseIpGetter";
import { useFetchNews } from "../home/Home";
import { ScienceForHome } from "./science/Science";
import { TechnologyForHome } from "./technology/Technology";
import { useFetchForAll } from "../../hooks/UseFetchForAll";
import { healthOptions, scienceOptions, technologyOptions } from "../../data/gnewsOptions";

export default function ScienceTechnologyPage() {
  const { ipdata, error: ipdataError } = useIpGetter();
  const scienceNewsData = useFetchNews(scienceOptions, ipdata?.country)
  const technologyNewsData = useFetchNews(technologyOptions, ipdata?.country)
  const healthNewsData = useFetchNews(healthOptions, ipdata?.country)

  const NEWSDATAIO_URL = ipdata?.country
    ? `https://newsdata.io/api/1/latest?country=us&language=en&category=technology&q=${encodeURIComponent("artificial intelligence")}&apikey=${import.meta.env.VITE_NEWSDATAIO_API_KEY}`
    : null
  const { data: aiNews, error: aiError } = useFetchForAll(NEWSDATAIO_URL)
  const aiArticles = aiNews?.results

  const sections = [
    {
      title: 'Latest in Technology',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <TechnologyForHome technologyNewsData={technologyNewsData?.articles} ipdata={ipdata} />
    },
    {
      title: 'Artificial Intelligence',
      customGrid: 'grid-area-finance',
      // customClass: 'flex md:flex-wrap [&>*]:basis-1/3 h-full',
      content: (
        aiError
          ? (<div className="text-black">Error loading data.</div>)
          : aiArticles && aiArticles.slice(0, 5).map((article, index) => {
            const source = {
              url: article.source_url,
              name: article.source_name,
            }

            return (
              <Card
                key={article.article_id}
                cardTitle={article.title}
                cardDescription={index === 0 ? article.description : null}
                cardImageSrc={article.image_url}
                source={source}
                link={article.link}
              />
            )
          })

      )
    },
    {
      title: 'Latest in Science',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <ScienceForHome scienceNewsData={scienceNewsData?.articles} ipdata={ipdata} />
    },
    {
      title: 'Health and Lifestyle',
      customGrid: 'grid-area-finance',
      content: (
        healthNewsData?.error
          ? (<div className="text-black">Error loading data. {healthNewsData?.error.message}</div>)
          : healthNewsData?.articles && healthNewsData?.articles.slice(0, 5).map((article) => {
            return (
              <Card
                key={article.id}
                cardTitle={article.title}
                cardImageSrc={article.image}
                source={article.source}
                link={article.url}
              />
            )
          })
      )
    }
  ]
  const isLoading = !scienceNewsData?.articles || !technologyNewsData?.articles || !healthNewsData?.articles
  return (
    <>
      {ipdataError && <ErrorPage />}
      {isLoading && <Spinner />}
      {<Section sectionData={sections} />}
    </>
  )
}

export function ScienceTechnologyForHome({ technologyNewsData, scienceNewsData, ipdata }) {
  const sections = [
    {
      title: 'Latest in Technology',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <TechnologyForHome technologyNewsData={technologyNewsData} ipdata={ipdata} />
    },
    {
      title: 'Latest in Science',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <ScienceForHome scienceNewsData={scienceNewsData} ipdata={ipdata} />
    }
  ]
  return (
    <Section id={'science-technology'} sectionData={sections} />
  )
}