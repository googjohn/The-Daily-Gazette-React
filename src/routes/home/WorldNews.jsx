import Section from "../../components/mainbody/Section";
import HeadNews from "./HeadNews";
import TrendingNews from "./TrendingNews";

export default function WorldNews() {
  const sections = [
    {
      title: null,
      customGrid: 'grid-area-head',
      content: <HeadNews />
    },
    {
      title: 'Trending',
      customGrid: 'grid-area-trend-container',
      content: <TrendingNews />
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