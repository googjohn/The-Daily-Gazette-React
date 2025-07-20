import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";

export default function BusinessFinance() {
  let popularChildren = []
  for (let i = 0; i < 10; i++) {
    popularChildren.push((
      <Card key={i} />
    ))
  }
  let sections = [
    {
      title: 'Business and Finance',
      customGrid: 'grid-area-6',
      content: (
        <>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </>
      )
    },
    {
      title: 'Popular in Business and Finance',
      customGrid: 'grid-area-7',
      content: popularChildren
    }
  ]

  return (
    <Section
      id={'finance-news'}
      sectionData={sections}
    />
  )
}