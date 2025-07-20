import Card from "../../components/card/Card";
import Aside from "../../components/mainbody/Aside";

export default function TrendingNews() {
  return (
    <div id="trending-news" className="text-black w-full h-full">
      <div className="section-title">
        <h2>Trending</h2>
      </div>
      <div className="grid grid-template grid-area-3">
        <div className="grid grid-template grid-area-4 min-h-[390px]">
          <div className=""><Card /></div>
          <div className=""><Card /></div>
          <div className=""><Card /></div>
        </div>
        <div className="">
          <Aside />
        </div>
      </div>
    </div>
  )
}