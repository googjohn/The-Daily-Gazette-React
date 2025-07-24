import Section from "../../components/mainbody/Section";
import HeadNews from "./HeadNews";
import TrendingNews from "./TrendingNews";

export default function WorldNews() {
  const sections = [
    {
      title: null,
      customGrid: 'grid-area-1',
      content: <HeadNews />
    },
    {
      title: 'Trending',
      customGrid: 'grid-area-3',
      content: <TrendingNews />
    }
  ]
  return (
    <Section id={'world-news'} sectionData={sections} salutation={true} />
  )
}