import Card from "../../components/card/Card";

export default function HeadNews() {
  return (
    <>
      <div id="head-news">
        <Card />
      </div>
      <div className="grid-item grid grid-template grid-area-box">
        <div className=""><Card cardTitle={'title'} cardDescription={'description'} /></div>
        <div className=""><Card cardTitle={'title'} cardDescription={'description'} /></div>
        <div className=""><Card cardTitle={'title'} cardDescription={'description'} /></div>
        <div className=""><Card cardTitle={'title'} cardDescription={'description'} /></div>
      </div>
    </>
  )
}