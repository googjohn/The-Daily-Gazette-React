import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";
import Section from "../../components/mainbody/Section";

export default function Sports() {
  const sections = [
    {
      title: 'Latest in Sports',
      customGrid: 'grid-area-10',
      content: (
        <>
          <div className="grid grid-template grid-area-11">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className="aside">
            <Aside asideTitle={'NBA Sports Updates'} />
            <Aside asideTitle={'MLB Sports Updates'} />
          </div>
        </>
      )
    }
  ]
  return (
    <Section id={'sports-news'} sectionData={sections} />
  )
}