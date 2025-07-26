import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";

export default function Entertainment() {
  const sections = [
    {
      title: 'Latest in Show Business',
      customGrid: 'grid-area-entmnt-scitech-container',
      content: (
        <>
          <div className="grid grid-template grid-area-entmnt-scitech">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className="aside">
            <Aside asideTitle={'More on Show Business'} />
          </div>
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