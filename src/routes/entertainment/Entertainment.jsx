import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";

export default function Entertainment() {
  const sections = [
    {
      title: 'Latest in Show Business',
      customGrid: 'grid-area-8',
      content: (
        <>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </>
      )
    }
  ]
  return (
    <Section
      id={'entertainment-news'}
      sectionData={sections}
    />
  )
}