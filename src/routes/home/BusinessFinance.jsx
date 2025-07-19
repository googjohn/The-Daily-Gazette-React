import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";

export default function BusinessFinance() {
  return (
    <Section
      id={'finance-news'}
      sectionTitle={'Business and Finance'}
      customGrid={'grid-area-6'}
    >
      <div><Card /></div>
      <div><Card /></div>
      <div><Card /></div>
      <div><Card /></div>
      <div><Card /></div>
    </Section>
  )
}