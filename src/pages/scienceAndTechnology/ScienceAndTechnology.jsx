import Section from "../../components/mainbody/Section";
import Science from "./science/Science";
import Technology from "./technology/Technology";

export default function ScienceTechnology({ technologyNewsData, scienceNewsData }) {
  const sections = [
    {
      title: 'Latest in Technology',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <Technology technologyNewsData={technologyNewsData} />
    },
    {
      title: 'Latest in Science',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <Science scienceNewsData={scienceNewsData} />
    }
  ]
  return (
    <Section id={'science-technology'} sectionData={sections} />
  )
}