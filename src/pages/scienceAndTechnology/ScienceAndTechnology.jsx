import Section from "../../components/mainbody/Section";
import { ScienceForHome } from "./science/Science";
import { TechnologyForHome } from "./technology/Technology";

export default function ScienceTechnology({ technologyNewsData, scienceNewsData, ipdata }) {
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