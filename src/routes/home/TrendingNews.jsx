import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";

export default function TrendingNews() {
  return (
    <>
      <div id="trend-news" className="grid grid-template grid-area-trend">
        <div className=""><Card /></div>
        <div className=""><Card /></div>
        <div className=""><Card /></div>
      </div>
      <div className="aside">
        <Aside asideTitle={'More Trending News'} />
      </div>
    </>
  )
}