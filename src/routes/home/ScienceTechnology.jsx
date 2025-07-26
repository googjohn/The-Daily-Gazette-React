import Section from "../../components/mainbody/Section";
import Science from "./Science";
import Technology from "./Technology";

export default function ScienceTechnology() {
  const sections = [
    {
      title: 'Latest in Technology',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <Technology />
    },
    {
      title: 'Latest in Science',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: <Science />
    }
  ]
  return (
    <Section id={'science-technology'} sectionData={sections} />
  )
}