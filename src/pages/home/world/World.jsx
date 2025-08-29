import Section from "../../../components/mainbody/Section";
import Head from "./Head";
import Trend from "./Trend";

export default function WorldNews({ headNewsData, trendNewsData }) {
  const sections = [
    {
      title: null,
      customGrid: 'grid-area-head',
      content: <Head headNewsData={headNewsData} />
    },
    {
      title: 'Trending',
      customGrid: 'grid-area-trend-container',
      content: <Trend trendNewsData={trendNewsData} />
    }
  ]
  return (
    <Section
      id={'world-news'}
      sectionData={sections}
      salutation={true}
      weatherData={true}
    />
  )
}