import Card from "../../components/card/Card"
import Aside from "../../components/mainbody/Aside"

export default function Science() {
  return (
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
        <Aside asideTitle={'More on Science'} />
      </div>
    </>
  )
}