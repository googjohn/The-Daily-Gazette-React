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
      customGrid: 'grid-area-finance',
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
      customGrid: 'grid-area-more-finance',
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