import Card from "../../components/card/Card";

const cardContent = {
  cardTitle: 'sample card',
  cardDescription: 'this card is a sample card.',
  cardImageSrc: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80',
  cardImageAlt: 'this is card image',
}
export default function HeadNews() {
  return (
    <>
      <div id="head-news">
        <Card
          cardTitle={cardContent.cardTitle}
          cardDescription={cardContent.cardDescription}
          cardImageSrc={cardContent.cardImageSrc}
          cardImageAlt={cardContent.cardImageAlt}
        />
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