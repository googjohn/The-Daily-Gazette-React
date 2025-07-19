import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";

export default function LocalNews() {
  return (
    <Section
      id={'local-news'}
      sectionTitle={'Latest Local News'}
      customGrid={"grid-area-5"}
    >
      <Card cardTitle={'title'} cardDescription={'description'} />
      <Card cardTitle={'title'} cardDescription={'description'} />
      <Card cardTitle={'title'} cardDescription={'description'} />
      <Card cardTitle={'title'} cardDescription={'description'} />
      <Card cardTitle={'title'} cardDescription={'description'} />
      <Card cardTitle={'title'} cardDescription={'description'} />
      <Card cardTitle={'title'} cardDescription={'description'} />
      <Card cardTitle={'title'} cardDescription={'description'} />
    </Section>
  )
}