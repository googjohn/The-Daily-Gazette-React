import Card from "../../components/card/Card";

export default function HeadNews() {
  return (
    <>
      <div id="head-news">
        <Card />
      </div>
      <div className="grid-item grid grid-template grid-area-2">
        <div className=""><Card cardTitle={'title'} cardDescription={'description'} /></div>
        <div className=""><Card cardTitle={'title'} cardDescription={'description'} /></div>
        <div className=""><Card cardTitle={'title'} cardDescription={'description'} /></div>
        <div className=""><Card cardTitle={'title'} cardDescription={'description'} /></div>
      </div>
    </>
  )
}