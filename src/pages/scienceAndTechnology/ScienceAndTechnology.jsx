import Section from "../../components/mainbody/Section";
import { ScienceForHome } from "./science/Science";
import { TechnologyForHome } from "./technology/Technology";

export default function ScienceTechnology({ technologyNewsData, scienceNewsData }) {
  const sections = [
    {
      title: 'Latest in Technology',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <TechnologyForHome technologyNewsData={technologyNewsData} />
    },
    {
      title: 'Latest in Science',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <ScienceForHome scienceNewsData={scienceNewsData} />
    }
  ]
  return (
    <Section id={'science-technology'} sectionData={sections} />
  )
}