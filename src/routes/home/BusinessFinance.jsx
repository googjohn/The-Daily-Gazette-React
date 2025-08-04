import { useRef } from "react";
import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";
import useFetch from "../../hooks/useFetch";

const businessOptions = {
  endpoint: 'top-headlines',
  category: 'business',
  language: 'en',
  max: 10,
}

export default function BusinessFinance() {
  // const { country: countryCode } = USERIP;
  // const financeOptions = generateOptions('top-headlines', 'business')

  const newsData = useRef(null)

  const { articles } = newsData.current = useFetch(businessOptions)
  console.log('this is the data from business finance', articles)

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
        articles && articles.slice(0, 5).map(article => (
          <Card
            key={article.id}
            cardTitle={article.title}
            cardDescription={article.description}
            cardImageSrc={article.image}
            source={article.source}
          />
        ))
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