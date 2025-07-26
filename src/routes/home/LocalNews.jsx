import Card from "../../components/card/Card";
import Section from "../../components/mainbody/Section";

export default function LocalNews() {
  const sections = [
    {
      title: 'Latest Local News',
      customGrid: 'grid-area-local',
      content: (
        <>
          <Card cardTitle={'title'} cardDescription={'description'} />
          <Card cardTitle={'title'} cardDescription={'description'} />
          <Card cardTitle={'title'} cardDescription={'description'} />
          <Card cardTitle={'title'} cardDescription={'description'} />
          <Card cardTitle={'title'} cardDescription={'description'} />
          <Card cardTitle={'title'} cardDescription={'description'} />
          <Card cardTitle={'title'} cardDescription={'description'} />
          <Card cardTitle={'title'} cardDescription={'description'} />
        </>
      )
    }
  ]
  return (
    <Section
      id={'local-news'}
      sectionData={sections}
    />
  )
}