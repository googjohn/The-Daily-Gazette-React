import Section from "../../components/mainbody/Section";
import Science from "./Science";
import Technology from "./Technology";

export default function ScienceTechnology() {
  const sections = [
    {
      title: 'Latest in Technology',
      customGrid: 'grid-area-8',
      content: <Technology />
    },
    {
      title: 'Latest in Science',
      customGrid: 'grid-area-8',
      content: <Science />
    }
  ]
  return (
    <Section id={'science-technology'} sectionData={sections} />
  )
}