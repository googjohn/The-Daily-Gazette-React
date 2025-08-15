import Section from "../../../components/mainbody/Section";
import Head from "./Head";
import Trend from "./Trend";

export default function WorldNews() {
  const sections = [
    {
      title: null,
      customGrid: 'grid-area-head',
      content: <Head />
    },
    {
      title: 'Trending',
      customGrid: 'grid-area-trend-container',
      content: <Trend />
    }
  ]
  return (
    <Section
      id={'world-news'}
      sectionData={sections}
      salutation={true}
    />
  )
}